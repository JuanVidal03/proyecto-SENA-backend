import {Router} from "express";
import uploadMiddleware from "../utils/handleStorage.js";
import { getAllUsuarios, getUsuarioByID,actualizarUsuario,borrarUsuario } from '../controller/usuarios.controller.js'

const userRouter = Router();

// Ruta para obtener todos los usuarios
userRouter.get('/usuarios', getAllUsuarios );

// Ruta para obtener un usuario por su ID
userRouter.get('/usuarios/:id',getUsuarioByID);

//Ruta para actualizar un usuario
userRouter.put('/usuarios/:id', uploadMiddleware.single("foto"),actualizarUsuario);

// Ruta para eliminar un usuario por su ID
userRouter.delete('/usuarios/:id',borrarUsuario);


export default userRouter;