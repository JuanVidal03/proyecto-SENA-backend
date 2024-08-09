import mongoose from 'mongoose';

const datoSchema = new mongoose.Schema({
    temperatura: {
        type: String,
        required: true
    },
    temperatura_s1: {
        type: String,
        required: true
    },
    temperatura_s2: {
        type: String,
        required: true
    },
    temperaturaPromedio: {
        type: String,
        required: true
    },
    idMaquina: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    seguimiento: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Seguimiento'
    }
});

export const Datos = mongoose.model('Datos', datoSchema);