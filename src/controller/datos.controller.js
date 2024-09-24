import { Datos } from '../models/datos.js';
import { Seguimiento } from '../models/seguimiento.model.js';

export const createDatos = async (req, res) => {
  const {
    IdSeguimiento,
    temperaturaAmbiente,
    temperaturaSensor,
    idMaquina,
    rotor,
    motor,
    fecha,
  } = req.body;

  try {
    //Crear el nuevo dato
    const nuevoDato = new Datos({
      seguimiento:IdSeguimiento,
      temperaturaAmbiente:temperaturaAmbiente,
      temperaturaSensor:temperaturaSensor,
      maquina:idMaquina,
      rotor:rotor,
      motor:motor,
      fecha:fecha,
    });

    //Guardar el dato en la base de datos
    const savedDato = await nuevoDato.save();

    //Buscar el seguimiento al que pertenecen los datos
    const seguimiento = await Seguimiento.findById(IdSeguimiento);
    if (!seguimiento) {
      return res.status(404).json({ message: 'Seguimiento no encontrado' });
    }

    //Agregar el id del dato recién creado al campo 'datos' del seguimiento
    seguimiento.datos.push(savedDato._id);
    
    //Guardar los cambios en el seguimiento
    await seguimiento.save();

    //Enviar la respuesta
    res.status(201).json({ message: 'Dato creado y agregado al seguimiento correctamente', data: savedDato });

  } catch (error) {
    res.status(400).json({ message: 'Error al crear el dato', error: error.message });
  }
};

export const getAllDatos = async (req, res) => {
    try {
      const datos = await Datos.find()
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