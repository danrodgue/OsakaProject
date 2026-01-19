const payload = {
  order: {
    restaurantName: 'Osaka',
    mesaNumber: 5,
    pedidoId: 'TEST123',
    numero_personas: 3,
    items: [
      { name: 'Sushi', quantity: 2, personalizaciones: 'Sin wasabi', comentarios: 'Sin cebolla' }
    ]
  }
}

;(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/print', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const text = await res.text()
    console.log('Status:', res.status)
    console.log('Body:', text)
  } catch (err) {
    console.error('Error en test-print:', err)
  }
})()
