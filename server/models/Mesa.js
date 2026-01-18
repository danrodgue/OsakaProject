import mongoose from '../database/config.js'

const mesaSchema = new mongoose.Schema({
  numero_mesa: {
    type: Number,
    required: true,
    unique: true
  },
  qr_code: {
    type: String,
    required: true,
    unique: true
  },
  estado: {
    type: String,
    enum: ['disponible', 'ocupada', 'reservada'],
    default: 'disponible'
  }
}, {
  timestamps: true
})

const Mesa = mongoose.model('Mesa', mesaSchema)

export default Mesa
