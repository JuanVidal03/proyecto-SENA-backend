import mongoose from 'mongoose';

const seguimientoSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true
  },
  maquina: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Maquina'
  },
  loteCafe: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Lotes'
  },
  usuarios: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Usuario'
  },
  TipoProceso: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'TiposProcesos'
  }
});

export const Seguimiento = mongoose.model('Seguimiento', seguimientoSchema);