import express from 'express';
import { Seguimiento } from '../models/seguimiento.js';
import { Maquina } from '../models/maquina.model.js';
import { Lotes } from '../models/loteCafe.js';
import { Usuario } from '../models/usuarios.model.js';
import { TiposProcesos } from '../models/tipoProceso.model.js';
const seguimientoRouter = express.Router();

// Crear un estado de máquina
seguimientoRouter.post('/seguimiento', async (req, res) => { 
    try {
        const { maquina, loteCafe, usuarios, TipoProceso } = req.body;


        const maquinas = await Maquina.findById(maquina);
        const loteCafee = await Lotes.findById(loteCafe);
        const usuarioss = await Usuario.findById(usuarios);
        const tipoProceso = await TiposProcesos.findById(TipoProceso);
        if (!maquinas || !loteCafee || !usuarioss || !tipoProceso) {
            return res.status(400).json({ message: "La maquina, lote de cafe y/o usuarios no existen" });
        }

        const seguimiento = await Seguimiento.create(req.body);
        res.status(201).json(seguimiento); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener todos los estados de máquina
seguimientoRouter.get('/seguimiento', async (req, res) => {
    try {
        const data = await Seguimiento.find()
            .populate('maquina') 
            .populate('loteCafe') 
            .populate('usuarios')
            .populate('TipoProceso'); 
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un estado de máquina por ID
seguimientoRouter.get('/seguimiento/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const seguimiento = await Seguimiento.findById(id);
        res.status(200).json(seguimiento);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Actualizar un estado de máquina por ID
seguimientoRouter.put('/seguimiento/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { estado, rotor, temperatura, temperatura_s1, temperatura_s2, temperatura_promedio, fecha, maquina, operarios, lote_cafe } = req.body;

        const updatedSeguimiento = await Seguimiento.updateOne(
            { _id: id },
            {
                $set: {
                    estado,
                    rotor,
                    temperatura,
                    temperatura_s1,
                    temperatura_s2,
                    temperatura_promedio,
                    fecha,
                    maquina,
                    operarios,
                    lote_cafe
                }
            }
        );

        res.status(200).json(updatedSeguimiento);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Borrar un estado de máquina por ID
seguimientoRouter.delete('/seguimiento/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const deletedSeguimiento = await Seguimiento.deleteOne({ _id: id });
        res.status(200).json(deletedSeguimiento);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default seguimientoRouter;
