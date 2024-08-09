import { Router } from "express";
const maquinaRouter = Router();
import { Maquina } from "../models/maquina.js"; 
import { getAllMaquinas, createMaquina } from "../controller/maquina.controller.js";

// Create máquina
maquinaRouter.post('/createMaquina', createMaquina);
maquinaRouter.get('/getAllMaquinas', getAllMaquinas);

// Get a máquina by ID
maquinaRouter.get('/maquinas/:id', async (req, res) => {
  const { id } = req.params;

  try {     
    const maquina = await Maquina.findById(id);
    res.status(201).json(maquina);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});


// Update a máquina by ID
maquinaRouter.put('/maquinas/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre,estado } = req.body;
  try {
    const updatedMaquina = await Maquina.findByIdAndUpdate(id, { nombre,estado });
    res.status(200).json(updatedMaquina);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a máquina by ID
maquinaRouter.delete('/maquinas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Maquina.findByIdAndDelete(id);
    res.status(200).json({ message: 'Máquina eliminada correctamente.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default maquinaRouter 