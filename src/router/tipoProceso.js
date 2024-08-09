import express from "express";
import { TiposProcesos } from "../models/tipoProceso.js";
const tipoProcesoRouter = express.Router();

// create tipos de procesos

tipoProcesoRouter.post("/tipoProceso", async (req, res) => {
  try {
    const nuevoTipoProceso = new TiposProcesos(req.body); 
    const savedTipoProceso = await nuevoTipoProceso.save();
    res.status(201).json(savedTipoProceso);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// get all tipos of procesos

tipoProcesoRouter.get("/tipoProceso", async (req, res) => {
  try {
    const tiposProcesos = await TiposProcesos.find({});
    res.status(200).json(tiposProcesos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// get a tipos  de procesos
tipoProcesoRouter.get("/tipoProceso/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tipoProceso = await TiposProcesos.findById(id);
    res.status(200).json(tipoProceso);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// uptade a tipos of procesos
tipoProcesoRouter.put("/tipoProceso/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const updatedTipoProceso = await TiposProcesos.updateOne({ _id: id }, { $set: { nombre } });
    res.status(200).json(updatedTipoProceso);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// delete a tipos of procesos
tipoProcesoRouter.delete("/tipoProceso/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await TiposProcesos.deleteOne({ _id: id });
    res.status(200).json({ message: 'Tipo de proceso eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default tipoProcesoRouter;