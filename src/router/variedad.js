import express from "express";
import { Variedades } from "../models/variedad.js";

const variedadesRouter = express.Router()

// create variedad
variedadesRouter.post('/variedad', async (req, res) => {
    try {
      const nuevaVariedad = new Variedades(req.body); 
      const savedVariedad = await nuevaVariedad.save();
      res.status(201).json(savedVariedad);
    }catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// get all variedad
variedadesRouter.get('/variedad', async (req, res) => {
    try {
      const variedades = await Variedades.find();
      res.status(200).json(variedades);
    }catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
// get a variedad
variedadesRouter.get('/variedad/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const variedad = await Variedades.findById(id);
      res.status(200).json(variedad);
    }catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// uptade a variedad
variedadesRouter.put('/variedad/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre } = req.body;
      const updatedVariedad = await Variedades.updateOne({ _id: id }, { $set: { nombre } });
      res.status(200).json(updatedVariedad);
    }catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// delete a variedad
variedadesRouter.delete('/variedad/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedVariedad = await Variedades.deleteOne({ _id: id });
      res.json(deletedVariedad);
    }catch (error) {
      res.json({ message: error.message });
    }
  });
  

export default variedadesRouter;