import express from 'express'
import { Datos } from '../models/datos.js';
const datosRouter = express.Router();


// Ruta para crear dato
datosRouter.post('/datos', async (req, res) => {
    const{
        temperatura,
        temperatura_s1,
        temperatura_s2,
        temperaturaPromedio,
        idMaquina,
        fecha,
        seguimiento,
    }=req.body;
    try {
      const nuevoDato = new Datos({
        temperatura,
        temperatura_s1,
        temperatura_s2,
        temperaturaPromedio,
        idMaquina,
        fecha,
        seguimiento,
      }); // Use 'new' for instance creation
      const savedDato = await nuevoDato.save();
      res.status(201).json({message: 'Dato creado correctamente', nuevoDato:savedDato});
    } catch (error) {
      res.status(400).json({ message:'Error al crear el dato',error: error.message });
    }
  });
  

// Ruta para obtener todos los datos
datosRouter.get('/datos', async (req, res) => {
    try {
      const datos = await Datos.find();
      res.json(datos);
    } catch (error) {
      res.json({ message: error.message });
    }
  });
  

// Ruta para obtener un dato por su ID
datosRouter.get('/datos/:id', (req, res) => {
    const { id } = req.params;
    Datos
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Ruta para actualizar un dato por su ID
datosRouter.put('/datos/:id',  (req, res) => {
    const { id } = req.params;
    const { temperatura, temperatura_s1, temperatura_s2, temperaturaPromedio, idMaquina, fecha } = req.body;
    Datos
    .updateOne({ _id: id }, { $set: { temperatura, temperatura_s1, temperatura_s2, temperaturaPromedio, idMaquina, fecha } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Ruta para eliminar un dato por su ID
datosRouter.delete('/datos/:id', (req, res) => {
    const { id } = req.params;
    Datos
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

export default datosRouter