import mongoose from 'mongoose';

const tiposProcesoSchema = new mongoose.Schema({

  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    default: "Sin descripcion"
  }

});

export const TiposProcesos = mongoose.model('TiposProcesos', tiposProcesoSchema);