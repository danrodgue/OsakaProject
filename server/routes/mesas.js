import express from 'express'
import Mesa from '../models/Mesa.js'
import Pedido from '../models/Pedido.js'

const router = express.Router()

// Obtener mesa por QR code
router.get('/qr/:qrCode', async (req, res) => {
  try {
    const { qrCode } = req.params
    const mesa = await Mesa.findOne({ qr_code: qrCode })

    if (!mesa) {
      return res.status(404).json({ error: 'Mesa no encontrada' })
    }

    // Convertir _id a id para el frontend
    const mesaObj = mesa.toObject()
    mesaObj.id = mesaObj._id.toString()
    delete mesaObj._id

    res.json(mesaObj)
  } catch (error) {
    console.error('Error al obtener mesa:', error)
    res.status(500).json({ error: 'Error al obtener mesa' })
  }
})

// Obtener pedido activo de una mesa
router.get('/:mesaId/pedido-activo', async (req, res) => {
  try {
    const { mesaId } = req.params
    const pedido = await Pedido.findOne({
      mesa_id: mesaId,
      estado: 'edicion'
    }).populate('mesa_id').sort({ createdAt: -1 })

    if (!pedido) {
      return res.json(null)
    }

    // Convertir a formato JSON plano
    const pedidoObj = pedido.toObject()
    if (pedidoObj.mesa_id) {
      pedidoObj.numero_mesa = pedidoObj.mesa_id.numero_mesa
    }

    res.json(pedidoObj)
  } catch (error) {
    console.error('Error al obtener pedido activo:', error)
    res.status(500).json({ error: 'Error al obtener pedido activo' })
  }
})

// Crear nuevo pedido para una mesa
router.post('/:mesaId/pedido', async (req, res) => {
  try {
    const { mesaId } = req.params
    const { numero_personas } = req.body

    if (!numero_personas || numero_personas < 1) {
      return res.status(400).json({ error: 'Número de personas es requerido' })
    }

    // Verificar si ya existe un pedido en edición
    const pedidoExistente = await Pedido.findOne({
      mesa_id: mesaId,
      estado: 'edicion'
    })

    if (pedidoExistente) {
      return res.json({ 
        id: pedidoExistente._id.toString(), 
        message: 'Ya existe un pedido en edición para esta mesa' 
      })
    }

    // Crear nuevo pedido
    const nuevoPedido = new Pedido({
      mesa_id: mesaId,
      numero_personas: parseInt(numero_personas),
      estado: 'edicion',
      items: []
    })

    const pedidoGuardado = await nuevoPedido.save()

    res.json({ 
      id: pedidoGuardado._id.toString(), 
      mesa_id: mesaId, 
      numero_personas: parseInt(numero_personas), 
      estado: 'edicion' 
    })
  } catch (error) {
    console.error('Error al crear pedido:', error)
    res.status(500).json({ error: 'Error al crear pedido' })
  }
})

export default router
