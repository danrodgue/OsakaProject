import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'

import './database/config.js' // Inicializar MongoDB
import mongoose from './database/config.js'
import { initMesas } from './database/initData.js'

import mesasRoutes from './routes/mesas.js'
import pedidosRoutes, { setIo } from './routes/pedidos.js'

dotenv.config()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/mesas', mesasRoutes)
app.use('/api/pedidos', pedidosRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// WebSocket para sincronización en tiempo real
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id)

  // Unirse a una sala de mesa específica
  socket.on('join-mesa', (mesaId) => {
    const room = `mesa-${mesaId}`
    socket.join(room)
    console.log(`Cliente ${socket.id} se unió a ${room}`)
  })

  // Abandonar sala de mesa
  socket.on('leave-mesa', (mesaId) => {
    const room = `mesa-${mesaId}`
    socket.leave(room)
    console.log(`Cliente ${socket.id} abandonó ${room}`)
  })

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id)
  })
})

// Función helper para emitir actualizaciones del carrito a una mesa
export const emitCartUpdate = (mesaId, pedidoData) => {
  io.to(`mesa-${mesaId}`).emit('cart-update', pedidoData)
}

// Inyectar io en las rutas de pedidos (después de crearlo)
setIo(io)

// Inicializar mesas en la base de datos (esperar a que MongoDB esté conectado)
mongoose.connection.once('open', async () => {
  console.log('🔄 MongoDB conectado, inicializando mesas...')
  try {
    await initMesas()
  } catch (error) {
    console.error('Error al inicializar mesas:', error)
  }
})

httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
  console.log(`📡 WebSocket disponible en ws://localhost:${PORT}`)
})

export { io }
