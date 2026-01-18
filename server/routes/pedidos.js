import express from 'express'
import Pedido from '../models/Pedido.js'
import Mesa from '../models/Mesa.js'

const router = express.Router()

// io se inyecta desde server.js para evitar dependencias circulares
let ioInstance = null

export const setIo = (io) => {
  ioInstance = io
}

// Función helper para emitir actualizaciones del carrito
const emitCartUpdate = async (pedidoId) => {
  if (!ioInstance) return
  try {
    const pedido = await Pedido.findById(pedidoId).populate('mesa_id')

    if (!pedido) return

    const pedidoObj = pedido.toObject()
    if (pedidoObj.mesa_id) {
      pedidoObj.numero_mesa = pedidoObj.mesa_id.numero_mesa
      pedidoObj.mesa_id = pedidoObj.mesa_id._id.toString()
    }

    // Emitir actualización a la sala de la mesa
    ioInstance.to(`mesa-${pedidoObj.mesa_id}`).emit('cart-update', pedidoObj)
  } catch (error) {
    console.error('Error al emitir actualización del carrito:', error)
  }
}

// Obtener pedido por ID
router.get('/:pedidoId', async (req, res) => {
  try {
    const { pedidoId } = req.params
    const pedido = await Pedido.findById(pedidoId).populate('mesa_id')

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' })
    }

    const pedidoObj = pedido.toObject()
    pedidoObj.id = pedidoObj._id.toString()
    delete pedidoObj._id
    
    if (pedidoObj.mesa_id) {
      pedidoObj.numero_mesa = pedidoObj.mesa_id.numero_mesa
      pedidoObj.mesa_id = pedidoObj.mesa_id._id.toString()
    }
    
    // Convertir items _id a id
    if (pedidoObj.items) {
      pedidoObj.items = pedidoObj.items.map(item => ({
        ...item,
        id: item._id.toString(),
        _id: undefined
      }))
    }

    res.json(pedidoObj)
  } catch (error) {
    console.error('Error al obtener pedido:', error)
    res.status(500).json({ error: 'Error al obtener pedido' })
  }
})

// Agregar item al pedido
router.post('/:pedidoId/items', async (req, res) => {
  try {
    const { pedidoId } = req.params
    const { plato_id, cantidad, personalizaciones, comentarios } = req.body

    if (!plato_id || !cantidad || cantidad < 1) {
      return res.status(400).json({ error: 'plato_id y cantidad son requeridos' })
    }

    const pedido = await Pedido.findById(pedidoId)

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' })
    }

    // Agregar item al array de items
    const nuevoItem = {
      plato_id: plato_id,
      cantidad: cantidad,
      personalizaciones: personalizaciones || null,
      comentarios: comentarios || null
    }

    pedido.items.push(nuevoItem)
    const pedidoGuardado = await pedido.save()

    // Obtener el último item agregado
    const itemAgregado = pedidoGuardado.items[pedidoGuardado.items.length - 1]
    const itemObj = itemAgregado.toObject()
    
    // Emitir actualización del carrito
    await emitCartUpdate(pedidoId)

    res.json({
      id: itemObj._id.toString(),
      plato_id: itemObj.plato_id,
      cantidad: itemObj.cantidad,
      personalizaciones: itemObj.personalizaciones,
      comentarios: itemObj.comentarios
    })
  } catch (error) {
    console.error('Error al agregar item:', error)
    res.status(500).json({ error: 'Error al agregar item al pedido' })
  }
})

// Actualizar cantidad de un item
router.put('/:pedidoId/items/:itemId', async (req, res) => {
  try {
    const { pedidoId, itemId } = req.params
    const { cantidad, personalizaciones, comentarios } = req.body

    if (cantidad !== undefined && cantidad < 1) {
      return res.status(400).json({ error: 'La cantidad debe ser mayor a 0' })
    }

    const pedido = await Pedido.findById(pedidoId)

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' })
    }

    const item = pedido.items.id(itemId)

    if (!item) {
      return res.status(404).json({ error: 'Item no encontrado' })
    }

    if (cantidad !== undefined) {
      item.cantidad = cantidad
    }

    if (personalizaciones !== undefined) {
      item.personalizaciones = personalizaciones || null
    }

    if (comentarios !== undefined) {
      item.comentarios = comentarios || null
    }

    await pedido.save()

    const itemObj = item.toObject()

    // Emitir actualización del carrito
    await emitCartUpdate(pedidoId)

    res.json({
      id: itemObj._id.toString(),
      plato_id: itemObj.plato_id,
      cantidad: itemObj.cantidad,
      personalizaciones: itemObj.personalizaciones,
      comentarios: itemObj.comentarios
    })
  } catch (error) {
    console.error('Error al actualizar item:', error)
    res.status(500).json({ error: 'Error al actualizar item' })
  }
})

// Eliminar item del pedido
router.delete('/:pedidoId/items/:itemId', async (req, res) => {
  try {
    const { pedidoId, itemId } = req.params

    const pedido = await Pedido.findById(pedidoId)

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' })
    }

    pedido.items.id(itemId).deleteOne()
    await pedido.save()

    // Emitir actualización del carrito
    await emitCartUpdate(pedidoId)

    res.json({ message: 'Item eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar item:', error)
    res.status(500).json({ error: 'Error al eliminar item' })
  }
})

// Confirmar pedido (cambiar estado de 'edicion' a 'confirmado')
router.post('/:pedidoId/confirmar', async (req, res) => {
  try {
    const { pedidoId } = req.params

    const pedido = await Pedido.findById(pedidoId).populate('mesa_id')

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' })
    }

    if (pedido.estado !== 'edicion') {
      return res.status(400).json({ error: 'El pedido no está en estado de edición' })
    }

    if (!pedido.items || pedido.items.length === 0) {
      return res.status(400).json({ error: 'El pedido no puede confirmarse sin items' })
    }

    // Actualizar estado del pedido
    pedido.estado = 'confirmado'
    pedido.fecha_confirmacion = new Date()
    const pedidoGuardado = await pedido.save()

    const pedidoObj = pedidoGuardado.toObject()
    if (pedidoObj.mesa_id) {
      pedidoObj.numero_mesa = pedidoObj.mesa_id.numero_mesa
      pedidoObj.mesa_id = pedidoObj.mesa_id._id.toString()
    }

    res.json(pedidoObj)
  } catch (error) {
    console.error('Error al confirmar pedido:', error)
    res.status(500).json({ error: 'Error al confirmar pedido' })
  }
})

export default router
