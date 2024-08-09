import { Maquina } from "../models/maquina.js";

export const createMaquina=async (req,res) => {
    const{ id, nombre, estado } = req.body

    try {

      const maquina = await new Maquina({ id, nombre, estado }); 
      const savedMaquina = await maquina.save();
      res.status(201).json({message:'maquina creda correctamente',maquina:savedMaquina})

    } catch (error) {
      res.status(500).json({ message:'error al crear la maquina',error: error.message });
    }
}

export const getAllMaquinas= async (req,res)=>{
    try {
      const maquinas = await Maquina.find();
      res.status(200).json(maquinas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

