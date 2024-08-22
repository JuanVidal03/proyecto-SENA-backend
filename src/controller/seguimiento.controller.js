import { Seguimiento } from "../models/seguimiento.model.js";
import { Usuario } from '../models/usuarios.model.js';
import { Maquina } from "../models/maquina.model.js";
import { Lotes } from "../models/loteCafe.model.js";

export const createSeguimiento = async (req, res) => { 

    const { maquina, loteCafe, operador } = req.body;
    
    try {
        const maquinas = await Maquina.findById(maquina);
        const loteCoffee = await Lotes.findById(loteCafe);
        const operario = await Usuario.findById(operador);

        if (!maquinas) return res.status(404).json({ message: 'La maquina no existe.' }); 
        if (!loteCoffee) return res.status(404).json({ message: 'El lote de cafe no existe.' }); 
        if (!operario) return res.status(404).json({ message: 'El operador no existe.' });

        if (operario.tipoUsuario !== "Operario" && operario.tipoUsuario !== "Administrador") return res.status(400).json({ message: "El usuario no tiene permiso para crear un proceso." });

        if(maquinas.estado !== "Inactivo") return res.status(400).json({ message: `La maquina: ${maquinas.nombre} no esta disponible por el momento.` });

        await Maquina.findByIdAndUpdate(maquina, { estado: "Activo" });

        const seguimiento = await Seguimiento.create(req.body);
        res.status(201).json({ message: "Seguimiento creado con exito.", seguimiento }); 

    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error al crear el seguimiento."
        });
    }
}

export const getAllSeguimiento = async (req, res) => {
    try {

        const seguimientos = await Seguimiento.find({})
            .populate('maquina') 
            .populate('loteCafe')
            .populate({
                path: 'operador',
                select: '-password'
            }).populate('datos');

        res.status(200).json({ message: "Seguimientos encontrados con exito.", seguimientos });

    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error al traer los seguimientos."
        });
    }
}

export const getSeguimientoById = async (req, res) => {
    
    const { id } = req.params;
    
    try {

        const seguimiento = await Seguimiento.findById(id)
            .populate('maquina')
            .populate('loteCafe')
            .populate({
                path: 'operador',
                select: '-password'
            });

        if(!seguimiento) return res.status(404).json({ message: `El seguimiento con id: ${id} no existe.` });

        res.status(200).json({ message: "Seguimiento encontrado exitosamente.", seguimiento });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updatedSeguimientoById =async (req, res) => {

    const { id } = req.params;
    const { maquina, loteCafe, operador } = req.body;

    try {

        const seguimiento = await Seguimiento.findById(id);
        if(!seguimiento) return res.status(404).json({ message: `El seguimiento con id: ${id} no existe.` });

        const machine = await Maquina.findById(maquina);
        const loteCoffee = await Lotes.findById(loteCafe);
        const operario = await Usuario.findById(operador);

        if(!machine) return res.status(404).json({ message: `La maquina con id: ${maquina} no existe.` });
        if(!loteCafe) return res.status(404).json({ message: `El loteCafe con id: ${loteCoffee} no existe.` });
        if(!operario) return res.status(404).json({ message: `El operario con id: ${operador} no existe.` });

        const updatedSeguimiento = await Seguimiento.findByIdAndUpdate(id, { maquina, loteCafe, operador }, { new:true });

        res.status(200).json({ message: "Seguimiento actualizado exitosamente.", updatedSeguimiento });

    }catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error al actualizar el seguimiento."
        });
    }
}

export const deleteSeguimientoId = async (req, res) => {
    
    const { id } = req.params;
    
    try{
        
        const seguimiento = await Seguimiento.findById(id);
        if(!seguimiento) return res.status(404).json({ message: `El seguimiento con id: ${id} no existe.` });

        const deletedSeguimiento = await Seguimiento.findByIdAndDelete(id);
        await Maquina.findByIdAndUpdate(deletedSeguimiento.maquina, { estado: "Inactivo" });

        res.status(200).json({ message: "Seguimiento eliminado con exito.", deletedSeguimiento });

    }catch (error) {
        res.status(500).json({
            error: error.message,
            message: `Erro al eliminar el seguimiento con id: ${id}`
        });
    }
}


export const getSeguimientoByMaquinaId = async(req, res) =>{

    const { idMaquina } = req.params;

    try {

        const foundMachine = await Maquina.findById(idMaquina);
        if (!foundMachine) return res.status(404).json({ message: `La maquina con id: ${idMaquina} no existe.` });

        const seguimientoPorMaquina = await Seguimiento.find({ maquina: idMaquina })
            .populate('maquina')
            .populate('loteCafe')
            .populate('operador')
            .populate('datos');
        if(seguimientoPorMaquina.length === 0) return res.status(400).json({ message: `No hay ningun seguimiento con esta maquina: ${idMaquina}.` });

        const seguimientoFinal = seguimientoPorMaquina[seguimientoPorMaquina.length -1];

        res.status(200).json({
            message: "Seguimiento encontrado por maquina exitosamente.",
            data: seguimientoFinal
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al abtener seguimiento por maquina",
            error: error.message
        });
    }

}