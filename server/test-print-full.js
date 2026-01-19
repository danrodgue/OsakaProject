// Test completo de impresión con datos reales de pedido

const testPrint = async () => {
  const pedidoCompleto = {
    restaurantName: 'Osaka',
    mesaNumber: 3,
    pedidoId: '65abc123def456',
    numero_personas: 4,
    type: 'TICKET DE PEDIDO',
    items: [
      {
        name: 'Sushi Roll Especial',
        quantity: 2,
        personalizaciones: 'Sin jengibre',
        comentarios: 'Muy frío por favor'
      },
      {
        name: 'Gyoza Pollo',
        quantity: 3,
        personalizaciones: null,
        comentarios: 'Al vapor'
      },
      {
        name: 'Ramen Tonkotsu',
        quantity: 2,
        personalizaciones: 'Picante nivel 3',
        comentarios: 'Sin cebollino'
      }
    ]
  }

  try {
    console.log('📤 Enviando pedido a impresora...\n')
    console.log('Datos del pedido:')
    console.log(JSON.stringify(pedidoCompleto, null, 2))
    console.log('\n')

    const response = await fetch('http://localhost:3000/api/print', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order: pedidoCompleto })
    })

    console.log(`📨 Respuesta del servidor: ${response.status}`)
    const result = await response.json()
    console.log('Resultado:', result)

    if (response.ok) {
      console.log('\n✅ ¡IMPRESIÓN ENVIADA EXITOSAMENTE!')
      console.log('Verifica en la terminal del simulador de impresora si recibió los datos.')
    }
  } catch (err) {
    console.error('❌ Error:', err.message)
  }
}

testPrint()
