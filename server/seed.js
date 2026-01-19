import mongoose from './database/config.js'
import { initMesas } from './database/initData.js'

// Script de conveniencia para inicializar datos en MongoDB
mongoose.connection.once('open', async () => {
  try {
    console.log('Conectado a MongoDB — ejecutando seed de mesas...')
    await initMesas()
    console.log('Seed completado: mesas inicializadas')
  } catch (err) {
    console.error('Error al inicializar seed:', err)
  } finally {
    mongoose.connection.close()
    process.exit(0)
  }
})
