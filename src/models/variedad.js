import mongoose from 'mongoose';

const variedadSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
});

export const Variedades = mongoose.model('Variedades', variedadSchema);
