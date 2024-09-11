import { TiposProcesos } from "../models/tipoProceso.model.js";
import { Usuario } from '../models/usuarios.model.js';
import { Lotes } from '../models/loteCafe.model.js';
import { Variedades } from '../models/variedad.model.js';

export const createLoteCafe =  async (req, res)=>{
    const { proveedor, tipoProceso, variedad, peso } = req.body

    try{
        
        const usuario = await Usuario.findById(proveedor);
        const tipoProcesos = await TiposProcesos.findById(tipoProceso);
        const variedades = await Variedades.findById(variedad);

        if(!usuario) return res.status(404).json({ message: `El usuario con id: ${usuario} no existe.` });
        if(!tipoProcesos) return res.status(404).json({ message: `El tipo de proceso con id: ${tipoProceso} no existe.` });
        if(!variedades) return res.status(404).json({ message: `La variedad con id: ${variedad} no existe.` });

        if(usuario.tipoUsuario !== "Proveedor") return res.status(400).json({ message: "El usuario no es un proveedor." });
        
        const loteCafe = await Lotes.create({ peso, proveedor, tipoProceso, variedad });
        res.status(201).json({ message: "Lote de cafe creado exitosamente.", loteCafe });

    } catch(error){
        res.status(500).json({
            error:error.message,
            message: "Error al crear el lote de cafe."
        })
    }
}

export const getAllLoteCafe = async (req, res) => {
    try {

        const lotesCafe = await Lotes.find({})
        .populate('tipoProceso')
        .populate('variedad')
        .populate({
            path: 'proveedor',
            select: '-password',
            populate: {
                path: "foto",
            },
        });

        res.status(200).json({ message: "Lotes encontrados exitosamente.", lotesCafe });

    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Erro al obtener todos los lotes de cafe."
        });
    }
}

export const getLoteCafeById = async (req, res) => {

    const { id } = req.params;

    try {

        const loteCafe = await Lotes.findById(id)
            .populate('tipoProceso')
            .populate('variedad')
            .populate({
                path: 'proveedor',
                select: '-password'
            });

        if(!loteCafe) return res.status(404).json({ message: `El lote de cafe con id: ${id} no existe.` });
        
        res.status(200).json({ message: "Lote de cafe encontrado exitosamente", loteCafe });

    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: `Error al obtener el lote de cafe con id: ${id}.`
        });
    }
}

export const updateLoteCafeById = async (req, res) => {

    const { id } = req.params;
    const { peso, proveedor, tipoProceso, variedad } = req.body;

    try {

        const loteSeguimiento = await Lotes.findById(id).populate('proveedor');
        if(!loteSeguimiento) return res.status(404).json({ message: `El lote de cafe con id: ${id} no existe.` });

        const proveedorFound = await Usuario.findById(proveedor);
        const tipoProcesoFound = await TiposProcesos.findById(tipoProceso);
        const variedadFound = await Variedades.findById(variedad);

        if(!proveedorFound) return res.status(404).json({ message: "El Proveedor no existe." });
        if(!tipoProcesoFound) return res.status(404).json({ message: "El Tipo de proceso no existe." });
        if(!variedadFound) return res.status(404).json({ message: "La variedad no existe no existe." });

        if(proveedorFound.tipoUsuario !== "Proveedor") return res.status(400).json({ message: "El usuario no es un proveedor." });

        const updatedLote = await Lotes.findByIdAndUpdate(id, { peso, proveedor, tipoProceso, variedad }, { new: true })
            .populate('variedad')
            .populate('tipoProceso')
            .populate({
                path: 'proveedor',
                select: '-password'
            });

        res.status(200).json({ message: "Lote de cafe actualizado correctamente.", updatedLote });

    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: `Error al actualizar el lote de cafe con id: ${id}`
        });
    }
}

export const deleteLoteCafeById = async (req, res) => {
    const { id } = req.params;

    try {

        const loteSeguimiento = await Lotes.findById(id);
        if(!loteSeguimiento) return res.status(404).json({ message: `El lote de cafe con id: ${id} no existe.` });

        const deletedLote = await Lotes.findByIdAndDelete(id)
            .populate('variedad')
            .populate('tipoProceso')
            .populate({
                path: 'proveedor',
                select: '-pasword'
            });
        res.status(200).json({ message: "Lote de cafe eliminado exitosamente.", deletedLote });

    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: `Error al eliminar el lote de cafe con id: ${id}.`
        });
    }
}