import express from 'express'
import bcrypt from "bcrypt";
import uploadMiddleware from '../utils/handleStorage.js';
import { Storage } from '../models/storage.js';
const authRouter = express.Router();
import jwt from 'jsonwebtoken';
// modelos
import { Usuario } from '../models/usuarios.js';
// importar modelo jwt
import { createAccesToken } from '../utils/jwt.js';
const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:8000';


// Ruta para registrar usuario
authRouter.post('/register', uploadMiddleware.single("foto"), async (req, res) => {

    // const { username, email, password, cedula, nombreCompleto, telefono, direccion, estado, foto, tipoUsuario } = req.body;
    const { body, file } = req;
    let fotoId;

    try {

        if (!file) {
            // Si no se sube una foto, utilizar la foto por defecto
            const fileData = {
                url: `${PUBLIC_URL}/usuario-undefined.png`, //url definida en controlador storage
                filename: 'usuario-undefined.png'
            };

            // Buscar o guardar la foto por defecto en la colección storage
            let fileSaved = await Storage.findOne({ filename: 'usuario-undefined.png' });
            if (!fileSaved) {
                fileSaved = await Storage.create(fileData);
            }
            fotoId = fileSaved._id;
        } else {
            const fileData = {
                url: `${PUBLIC_URL}/${file.filename}`,
                filename: file.filename
            };

            // Guardar el archivo en la colección storage
            const fileSaved = await Storage.create(fileData);
            fotoId = fileSaved._id;
        }

        // Crear usuario vinculando id foto
        const userData = {
            ...body,
            foto: fotoId
        };

        // Verificar si el usuario ya existe
        let user = await Usuario.findOne({ email: userData.email });
        if (user) {
            return res.status(400).json({ message: 'El usuario ya existe!' });
        }

        // Crear el usuario con la contraseña encriptada
        user = new Usuario(userData);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(userData.password, salt);

        await user.save();

        const token = await createAccesToken({id:user._id});
        res.cookie("token", token);
        res.status(200).json({username, email, cedula, nombreCompleto, telefono, direccion, estado, foto, tipoUsuario});

    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario", error: error.message });
    }
});


// para el ingreso a la aplicacion
authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await Usuario.findOne({ email }).populate('foto');
        if(!user) return res.status(400).json({ message: 'Contraseña o usuario incorrectos.' });

        const comparePassword = await bcrypt.compare(password, user.password);
        if(comparePassword === false) return res.status(400).json({message: 'Contraseña o usuario incorrectos.'});

        // generar token
        const token = await createAccesToken({ id: user._id, rol: user.tipoUsuario });

        res.cookie("token", token, {
            secure: true,
            sameSite: "none",
            httpOnly: false,
        });
        res.status(200).json({user, token});

    } catch (error) {
        console.log('Error al ingresar a la aplicacion!');
        console.log(error);
        res.status(500).json(error);
    }
})


// verificar el token
authRouter.get('/verify-token', async (req, res) => {

    try {
        const { token } = req.cookies;
        if(!token) return res.status(400).json({message: "Sin autorizacion"});

        jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
            if(err) return res.status(400).json({message:err});

            const foundUser = await Usuario.findOne({_id: user.id});
            if (!foundUser) return res.status(400).json({message: "Usuario no encontrado."});
            
            return res.status(200).json(foundUser);
            
        })
        
    } catch (error) {
        console.log("Error al verificar el token", error);
        res.status(500).json({message: "Error al verificar el token"});
    }

})


// salir de la aplicacion
authRouter.post('/logout', (req, res) => {

    try {
        
        res.cookie("token", "", {
            expires: new Date(0)
        });
        res.status(200).json({message: "Sesion cerrada exitosamente!"});

    } catch (error) {
        console.log(`Error al cerrar la sesion: ${error.message}`);
        console.log(error);
        res.status(500).json(`Error al cerrar la sesion: ${error.message}`);
    }

})


export default authRouter;