import express from "express";
import { TiposProcesos } from "../models/tipoProceso.model.js";
const tipoProcesoRouter = express.Router();

// create tipos de procesos

tipoProcesoRouter.post("/tipoProceso", async (req, res) => {

  const {nombre,descripcion} = req.body;

    try {
      const tipoProceso = await TiposProcesos.create({nombre,descripcion});

      res.status(201).json({
        message: "Tipo proceso creado correctamente",
        tipoProceso
      });

    } catch (error) {
      res.status(500).json({
        message: "Error al crear el tipo proceso",
        error: error.message
      });
    }
});



// get all tipos of procesos

tipoProcesoRouter.get("/tipoProceso", async (req, res) => {

  try {
    const tiposProcesos = await TiposProcesos.find({});

    res.status(200).json({
      message: "Tipos de procesos obtenidos correctamente",
      tiposProcesos
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al encontrar los tipos de procesos",
      error: error.message
    });
  }
});


// get a tipos  de procesos
tipoProcesoRouter.get("/tipoProceso/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tipoProceso = await TiposProcesos.findById(id);
    
    //verificar si existe
    if (!tipoProceso){
      return res.status(404).json({
        message: "Tipo de proceso no encontrado con ese id" 
      });
    }

    res.status(200).json({
      message: "Tipo de proceso encontrado correctamente",
      tipoProceso
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener la variedad",
      error: error.message 
    });
  }
});


// uptade a tipos of procesos
tipoProcesoRouter.put("/tipoProceso/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre,descripcion } = req.body;

    // Verificar si el tipo de proceso existe
    const tipoProcesoExistente = await TiposProcesos.findById(id);

    if (!tipoProcesoExistente) {
      return res.status(404).json({
        message: "ID no encontrado. No se puede actualizar."
      });
    }

    // Actualizar el tipo de proceso
    const updatedTipoProceso = await TiposProcesos.updateOne({ _id: id }, { $set: { nombre,descripcion } });
    
    res.status(200).json({
      message: "Tipo de proceso actualizado correctamente",
      updatedTipoProceso
    });

  } catch (error) {
    res.status(500).json({
      message:"Error al actualizar tipo proceso",
      error: error.message
    });
  }
});


// delete a tipos of procesos
tipoProcesoRouter.delete("/tipoProceso/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el tipo de proceso existe
    const tipoProcesoExistente = await TiposProcesos.findById(id);

    if (!tipoProcesoExistente) {
      return res.status(404).json({
        message: "ID no encontrado. No se puede eliminar."
      });
    }

    // Eliminar el tipo de proceso
    const deleteTipoProceso = await TiposProcesos.deleteOne({ _id: id });

    res.status(200).json({
      message: 'Tipo de proceso eliminado correctamente',
      deleteTipoProceso
    });

    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar tipo proceso",
        error: error.message
      });
    }
});


export default tipoProcesoRouter;