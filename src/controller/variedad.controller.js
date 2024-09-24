import { Variedades } from '../models/variedad.model.js';

export const createVariedad = async (req, res) => {
    console.log("Request recibida:", req.body); 
    const {nombre} = req.body;

      try {
        

        if (!nombre){
          return res.status(400).json({
            message: "El nombre de la variedad es obligatorio" 
            }); 
        }
        const variedad = await Variedades.create({nombre});
  
        res.status(201).json({
          message: "Variedad creada correctamente",
          variedad
        });
  
      }catch (error) {
        res.status(500).json({ 
          message:"Error al crear la variedad",
          error: error.message
        });
      }
}

export const getAllVariedad = async (req, res) => {

    try {
      
      
      const variedades = await Variedades.find();

      res.status(200).json({
        message: "variedades encontradas correctamente",
        variedades
      });

    }catch (error) {
      res.status(500).json({
        message:"Error al encontrar las variedades",
        error: error.message
      });
    }
}

export const getVariedadId = async (req, res) => {
    try {
      const { id } = req.params;
      const variedad = await Variedades.findById(id);
      
  
      //verificar si la variedad existe
      if (!variedad) {
        return res.status(404).json({ 
          message: "Variedad no encontrada con ese id"
        });
      }
      
      res.status(200).json({
        message: "Variedad encontrada correctamente",
        variedad
      });
  
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener variedad",
        error: error.message
      });
    }
}

export const updateVariedadId =  async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre } = req.body;
      
      // Verificar si la variedad existe
      const variedadExistente = await Variedades.findById(id);
  
      if (!variedadExistente) {
        return res.status(404).json({
          message: "ID no encontrado. No se puede actualizar."
        });
      }
  
      // Actualizar la variedad
      const updatedVariedad = await Variedades.updateOne({ _id: id }, { $set: { nombre } });
  
      res.status(200).json({
        message: "Variedad actualizada correctamente",
        updatedVariedad
      });
  
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar variedad",
        error: error.message
      });
    }
}

export const deleteVariedadId = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Verificar si la variedad existe 
      const variedadExistente = await Variedades.findById(id);
  
      if (!variedadExistente) {
        return res.status(404).json({
          message: "ID no encontrado. No se puede eliminar."
        });
      }
  
      // Eliminar la variedad
      const deletedVariedad = await Variedades.deleteOne({ _id: id });
      
      res.status(200).json({
        message: "Variedad eliminada correctamente",
        deletedVariedad
      });
  
    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar variedad",
        error: error.message
      });
    }
  }