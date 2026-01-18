import mongoose from '../database/config.js'

const itemPedidoSchema = new mongoose.Schema({
  plato_id: {
    type: Number,
    required: true
  },
  cantidad: {
    type: Number,
    required: true,
    default: 1
  },
  personalizaciones: {
    type: String,
    default: null
  },
  comentarios: {
    type: String,
    default: null
  }
}, {
  timestamps: true,
  _id: true  // Asegurar que los items tienen _id
})

const pedidoSchema = new mongoose.Schema({
  mesa_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mesa',
    required: true
  },
  numero_personas: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    enum: ['edicion', 'confirmado', 'en_preparacion', 'listo', 'entregado', 'cancelado'],
    default: 'edicion'
  },
  items: [itemPedidoSchema],
  fecha_confirmacion: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
})

const Pedido = mongoose.model('Pedido', pedidoSchema)

export default Pedido
