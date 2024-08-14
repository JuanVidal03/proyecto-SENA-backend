import mongoose from 'mongoose';

const seguimientoSchema = new mongoose.Schema({
  maquina: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Maquina'
  },
  fecha: {
    type: Date,
    default: Date.now,
    required: true
  },
  loteCafe: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Lotes'
  },
  operador: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Usuario'
  },
  datos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Datos"
  }]
});

export const Seguimiento = mongoose.model('Seguimiento', seguimientoSchema);