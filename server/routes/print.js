import express from 'express'
import net from 'net'

const router = express.Router()

// Helper: construir un ticket ESC/POS simple a partir de los datos del pedido
const construirBufferTicket = (pedido) => {
  // ESC/POS commands (as binary strings)
  const ESC = '\x1b'
  const GS = '\x1d'
  const init = ESC + '@' // Initialize printer
  const alignCenter = ESC + 'a' + '\x01'
  const alignLeft = ESC + 'a' + '\x00'
  const boldOn = ESC + 'E' + '\x01'
  const boldOff = ESC + 'E' + '\x00'
  const cut = GS + 'V' + '\x00'
  const lineas = []

  lineas.push(init)
  lineas.push(alignCenter)
  if (pedido.restaurantName) lineas.push(boldOn + pedido.restaurantName + '\n' + boldOff)
  lineas.push(pedido.type || 'TICKET')
  lineas.push('\n')
  lineas.push(alignLeft)

  if (pedido.mesaNumber) lineas.push(`Mesa: ${pedido.mesaNumber}\n`)
  if (pedido.pedidoId) lineas.push(`Pedido: ${pedido.pedidoId}\n`)
  if (pedido.numero_personas) lineas.push(`Personas: ${pedido.numero_personas}\n`)
  lineas.push(`Fecha: ${new Date().toLocaleString()}\n`)
  lineas.push('--------------------------------\n')

  if (Array.isArray(pedido.items)) {
    pedido.items.forEach((it, idx) => {
      const nombre = it.name || it.plato_name || `Item ${idx + 1}`
      const cantidad = it.quantity || it.cantidad || 1
      lineas.push(`${cantidad} x ${nombre}\n`)
      if (it.personalizaciones) lineas.push(`  + ${it.personalizaciones}\n`)
      if (it.comentarios) lineas.push(`  > ${it.comentarios}\n`)
    })
  }

  lineas.push('\n')
  lineas.push('--- Gracias por su pedido ---\n')
  lineas.push('\n\n')
  lineas.push(cut)

  // Unir y convertir a Buffer usando codificación binaria
  const contenidoImpresion = lineas.join('')
  return Buffer.from(contenidoImpresion, 'binary')
}

// POST /api/print  -> body: { order: {...} }
router.post('/', async (req, res) => {
  try {
    const pedido = req.body.order || req.body

    // Soporta variables de entorno en inglés y español
    const IMPRESORA_HOST = process.env.PRINTER_HOST || process.env.IMPRESORA_HOST
    const IMPRESORA_PORT = parseInt(process.env.PRINTER_PORT || process.env.IMPRESORA_PORT || '9100', 10)

    if (!IMPRESORA_HOST) {
      return res.status(400).json({ error: 'IMPRESORA_HOST no está configurado en las variables de entorno del servidor' })
    }

    const contenido = construirBufferTicket(pedido)

    const cliente = new net.Socket()

    cliente.setTimeout(5000)

    cliente.connect(IMPRESORA_PORT, IMPRESORA_HOST, () => {
      cliente.write(contenido)
    })

    cliente.on('error', (err) => {
      console.error('Error de conexión con la impresora:', err)
      try { cliente.destroy() } catch (e) {}
      return res.status(500).json({ error: 'Error al conectar con la impresora', details: String(err) })
    })

    cliente.on('close', () => {
      // Si ya se respondió por error, ignorar
    })

    // Cuando los datos se hayan enviado finalizamos la conexión y respondemos
    cliente.on('drain', () => {
      try { cliente.end() } catch (e) {}
      return res.json({ ok: true })
    })

    // Seguridad: responder tras un tiempo si no hay evento drain
    setTimeout(() => {
      try { cliente.end() } catch (e) {}
      return res.json({ ok: true, warning: 'tiempo de espera agotado al enviar a la impresora' })
    }, 1500)
  } catch (error) {
    console.error('Error de impresión:', error)
    return res.status(500).json({ error: 'Error al imprimir', details: String(error) })
  }
})

export default router
