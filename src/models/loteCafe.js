import mongoose from 'mongoose';

const loteCafeSchema = new mongoose.Schema({
  peso: {
    type: Number,
    required: true
  },
  proveedor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Usuario'
  },
  tipoProceso: {
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
// {
//   "peso": 50,
//   "proveedor": "finca el sol",
//   "tipoProceso": "", 66bcad740a9ac2dca24ae00c 66bcb353f1d5eddcc8be7b57
//   "variedad": ""
   
// }