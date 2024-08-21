import {Router} from 'express'
import { createDatos, deleteDatos, getAllDatos, getDatosById, updateDatos, } from '../controller/datos.controller.js';

const datosRouter = Router();

// Ruta para crear dato
datosRouter.post('/datos',createDatos );
  
// Ruta para obtener todos los datos
datosRouter.get('/datos',getAllDatos );

// Ruta para obtener un dato por su ID
datosRouter.get('/datos/:id',getDatosById );

// Ruta para actualizar un dato por su ID
datosRouter.put('/datos/:id',updateDatos  );

// Ruta para eliminar un dato por su ID
datosRouter.delete('/datos/:id', deleteDatos);

export default datosRouter