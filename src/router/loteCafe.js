import express from 'express'
import { Lotes } from '../models/loteCafe.js';
const lotesRouter = express.Router();
import { Usuario } from '../models/usuarios.model.js';
import { TiposProcesos } from '../models/tipoProceso.model.js';
import { Variedades } from '../models/variedad.model.js';

// Crear un lote de café
lotesRouter.post('/loteCafe', async (req, res)=>{
    try{
        const { usuarios, tipoProcesos, variedad } = req.body
        const usuario= await Usuario.findById(usuarios)
        const tipoProceso= await TiposProcesos.findById(tipoProcesos)
        const variedades= await Variedades.findById(variedad)

        if (!usuario || !tipoProceso || !variedades) {
            res.status(400).json({message:"el usuario,tipo proceso y variedad no existe"})
        }

        
        const loteCafe= await Lotes.create(req.body)
        res.status(201).json(loteCafe);
    } catch(error){
        res.status(500).json({message:error.message})
    }

});

// Obtener todos los lotes de café
lotesRouter.get('/loteCafe', async (req, res) => {
    try {

        const data = await Lotes.find()
        .populate('tipoProcesos')
        .populate('variedad')
        .populate('usuarios');

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});  

// Obtener un lote de café por ID
lotesRouter.get('/loteCafe/:id', async (req, res) => {
    const { id } = req.params;

    try {

        const data = await Lotes.findById(id)
            .populate('tipoProcesos')
            .populate('variedad')
            .populate('usuarios');
        
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// Actualizar un lote de café por ID
lotesRouter.put('/loteCafe/:id', async (req, res) => {
    const { id } = req.params;
    const { peso, proveedores, tiposProcesos, variedad } = req.body;

    try {

        const updatedLote = await Lotes.findByIdAndUpdate(id, { peso, proveedores, tiposProcesos, variedad });
        res.status(200).json(updatedLote);

    } catch (error) {
        res.status(500).json({ message: error });
    }
});


// Borrar un lote de café por ID
lotesRouter.delete('/loteCafe/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const deletedLote = await Lotes.findByIdAndDelete(id);
        res.status(200).json(deletedLote);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});


export default lotesRouter