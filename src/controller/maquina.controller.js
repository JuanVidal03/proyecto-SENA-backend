import { Maquina } from "../models/maquina.model.js";

export const createMaquina = async(req, res) => {

    try {

      const allMaquinas = await Maquina.find({});

      const maquinaSchema = {
        id: allMaquinas.length < 9 ? `M0${allMaquinas.length + 1}` : `M${allMaquinas.length + 1}`,
        nombre: `Maquina ${allMaquinas.length + 1}`,
        estado: "Inactivo"
      };

      const maquina = await Maquina.create(maquinaSchema);

      res.status(201).json({ message:'Maquina creada correctamente.', maquina });

    } catch (error) {
      res.status(500).json({
        message:'Error al crear la maquina.',
        error: error.message
      });
    }
}

export const getAllMaquinas = async(req, res) => {
    try {

      const maquinas = await Maquina.find();
      res.status(200).json({
        message: "Maquinas encontradas exitosamente.",
        maquinas
      });

    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: "Error al obtener todas las maquinas."
      });
    }
}

export const getMaquinaById = async(req, res) => {

  const { id } = req.params;

  try {

    const foundMaquina = await Maquina.findById(id);
    if(!foundMaquina) return res.status(400).json({ message: `Maquina con id: ${id} no existe.` });
    
    const maquina = await Maquina.findById(id);
    res.status(200).json({
      message: `Maquina con id: ${id} encontrada exitosamente.`,
      maquina
    });

  } catch (error) {
    res.status(500).json({
      message: `Error al obtener la maquina con id: ${id}`
    })
  }
}

export const updateMaquinaById = async(req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {

    const foundMaquina = await Maquina.findById(id);
    if(!foundMaquina) return res.status(404).json({ message: `La maquina con id: ${id} no existe.` });

    const updatedMaquina = await Maquina.findByIdAndUpdate(id, { estado });

    res.status(200).json({
      message: "Maquina actualizada exitosamente.",
      updatedMaquina
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: `Error al actualziar la maquina con id: ${id}`
    });
  }
}

export const deleteMaquinaById = async(req, res) => {

  const { id } = req.params;
  
  try {

    const foundMaquina = await Maquina.findById(id);
    if (!foundMaquina) return res.status(404).json({ message: `La maquina con id: ${id} no existe.` });

    const deletedMachine = await Maquina.findByIdAndDelete(id);
    res.status(200).json({ message: 'Máquina eliminada correctamente.', deletedMachine });

  } catch (error) {
    res.status(500).json({
      error: error.message, 
      message: `Error al eliminar la maquina con id: ${id}`,
    });
  }

}