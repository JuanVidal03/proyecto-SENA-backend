import { Datos } from '../models/datos.js';

export const createDatos = async (req, res) => {
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
}

export const getAllDatos = async (req, res) => {
    try {
      const datos = await Datos.find();
      res.json(datos);
    } catch (error) {
      res.json({ message: error.message });
    }
}

export const getDatosById = async (req, res) => {
    try {
      const datos = await Datos.find();
      res.json(datos);
    } catch (error) {
      res.json({ message: error.message });
    }
}

export const updateDatos = (req, res) => {
    const { id } = req.params;
    Datos
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
}

export const deleteDatos = (req, res) => {
    const { id } = req.params;
    Datos
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
}