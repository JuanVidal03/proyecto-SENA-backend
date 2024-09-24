import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cedula: {
    type: String,
    required: true,
    unique: true
  },
  nombreCompleto: {
    type: String, 
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  estado: {
    type: Boolean
  },
  foto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Storage',
    required: false
  },
  tipoUsuario: {
    type: String,
    enum: ['Administrador', 'Operario', 'Proveedor'],
    required: true
  }
});

export const Usuario = mongoose.model('Usuario', usuarioSchema);

