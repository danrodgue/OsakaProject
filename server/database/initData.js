import Mesa from '../models/Mesa.js'

// Inicializar mesas en la base de datos
export const initMesas = async () => {
  try {
    // Verificar si ya existen mesas
    const mesasExistentes = await Mesa.countDocuments()
    
    if (mesasExistentes === 0) {
      // Crear 10 mesas
      const mesas = []
      for (let i = 1; i <= 10; i++) {
        mesas.push({
          numero_mesa: i,
          qr_code: `QR${i}`,
          estado: 'disponible'
        })
      }
      
      await Mesa.insertMany(mesas)
      console.log('✅ Mesas inicializadas en la base de datos')
    } else {
      console.log('ℹ️  Las mesas ya existen en la base de datos')
    }
  } catch (error) {
    console.error('Error al inicializar mesas:', error)
  }
}
