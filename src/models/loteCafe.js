import mongoose from 'mongoose';

const loteCafeSchema = new mongoose.Schema({
  peso: {
    type: Number,
    required: true
  },
  usuarios: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Usuario'
  },
  tipoProcesos: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'TiposProcesos'
  },
  variedad: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Variedades'
  }
});

export const Lotes = mongoose.model('Lotes', loteCafeSchema);