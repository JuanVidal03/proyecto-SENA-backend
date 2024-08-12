import mongoose from 'mongoose';

const datoSchema = new mongoose.Schema({
    temperaturaAmbiente: {
        type: String,
        required: true
    },
    temperaturaSensor: {
        type: String,
        required: true
    },
    maquina: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Maquinas",
        required: true
    },
    rotor: {
        type: Boolean,
        required: true
    },
    motor: {
        type: Boolean,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now,
        required: true
    }
});

export const Datos = mongoose.model('Datos', datoSchema);