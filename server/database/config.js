import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/osaka_restaurant'

// Conectar a MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB')
  })
  .catch((error) => {
    console.error('❌ Error al conectar a MongoDB:', error.message)
    console.error('💡 Asegúrate de que MongoDB esté corriendo')
  })

export default mongoose
