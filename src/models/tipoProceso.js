import mongoose from 'mongoose';

const tiposProcesoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  }
});

export const TiposProcesos = mongoose.model('TiposProcesos', tiposProcesoSchema);