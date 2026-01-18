import { io } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000'

let socket = null

export const connectSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling']
    })
  }
  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

export const joinMesa = (mesaId) => {
  if (!socket) {
    connectSocket()
  }
  socket.emit('join-mesa', mesaId)
}

export const leaveMesa = (mesaId) => {
  if (socket) {
    socket.emit('leave-mesa', mesaId)
  }
}

export const onCartUpdate = (callback) => {
  if (!socket) {
    connectSocket()
  }
  socket.on('cart-update', callback)
  return () => {
    if (socket) {
      socket.off('cart-update', callback)
    }
  }
}

export const getSocket = () => {
  if (!socket) {
    connectSocket()
  }
  return socket
}
