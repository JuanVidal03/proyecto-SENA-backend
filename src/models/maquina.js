import mongoose from "mongoose"

const maquinaSchema = mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    nombre:{
        type:String,
        required:true
    },
    estado:{
        type:String,
        require:true,
        enum:['Activo','Inactivo','En Mantenimiento']
    }
})

export const Maquina = mongoose.model('Maquina', maquinaSchema);