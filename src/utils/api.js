const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Obtener mesa por QR code
export const getMesaByQR = async (qrCode) => {
  const response = await fetch(`${API_BASE_URL}/mesas/qr/${qrCode}`)
  if (!response.ok) {
    throw new Error('Mesa no encontrada')
  }
  return response.json()
}

// Obtener pedido activo de una mesa
export const getPedidoActivo = async (mesaId) => {
  const response = await fetch(`${API_BASE_URL}/mesas/${mesaId}/pedido-activo`)
  if (!response.ok) {
    throw new Error('Error al obtener pedido activo')
  }
  const data = await response.json()
  return data || null
}

// Crear nuevo pedido para una mesa
export const createPedido = async (mesaId, numeroPersonas) => {
  const response = await fetch(`${API_BASE_URL}/mesas/${mesaId}/pedido`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ numero_personas: numeroPersonas })
  })
  if (!response.ok) {
    throw new Error('Error al crear pedido')
  }
  return response.json()
}

// Obtener pedido por ID
export const getPedido = async (pedidoId) => {
  const response = await fetch(`${API_BASE_URL}/pedidos/${pedidoId}`)
  if (!response.ok) {
    throw new Error('Error al obtener pedido')
  }
  return response.json()
}

// Agregar item al pedido
export const addItemToPedido = async (pedidoId, item) => {
  const response = await fetch(`${API_BASE_URL}/pedidos/${pedidoId}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      plato_id: item.dish.id,
      cantidad: item.quantity,
      personalizaciones: item.customizations ? JSON.stringify(item.customizations) : null,
      comentarios: item.comments || null
    })
  })
  if (!response.ok) {
    throw new Error('Error al agregar item al pedido')
  }
  return response.json()
}

// Actualizar item del pedido
export const updateItemInPedido = async (pedidoId, itemId, updates) => {
  const response = await fetch(`${API_BASE_URL}/pedidos/${pedidoId}/items/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cantidad: updates.quantity,
      personalizaciones: updates.customizations ? JSON.stringify(updates.customizations) : null,
      comentarios: updates.comments || null
    })
  })
  if (!response.ok) {
    throw new Error('Error al actualizar item')
  }
  return response.json()
}

// Eliminar item del pedido
export const deleteItemFromPedido = async (pedidoId, itemId) => {
  const response = await fetch(`${API_BASE_URL}/pedidos/${pedidoId}/items/${itemId}`, {
    method: 'DELETE'
  })
  if (!response.ok) {
    throw new Error('Error al eliminar item')
  }
  return response.json()
}

// Confirmar pedido
export const confirmarPedido = async (pedidoId) => {
  const response = await fetch(`${API_BASE_URL}/pedidos/${pedidoId}/confirmar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error('Error al confirmar pedido')
  }
  return response.json()
}
