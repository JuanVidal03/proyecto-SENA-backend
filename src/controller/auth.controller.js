import { Usuario } from '../models/usuarios.model.js';
import { createAccesToken } from '../utils/jwt.js';
import { Storage } from '../models/storage.model.js';
import uploadMiddleware from '../utils/handleStorage.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const PUBLIC_URL = process.env.PUBLIC_URL;

export const createRegister = async (req, res) => {
    uploadMiddleware.single("foto")(req, res, async () => {
        const { body, file } = req;
        let fotoId;

        try {
            const userEmail = await Usuario.findOne({ email: body.email });
            const userUsername = await Usuario.findOne({ username: body.username });
            const userCedula = await Usuario.findOne({ cedula: body.cedula });

            if (userEmail) return res.status(400).json({ message: `El usuario con email ${body.email} ya existe.` });
            if (userUsername) return res.status(400).json({ message: `El usuario con username ${body.username} ya existe.` });
            if (userCedula) return res.status(400).json({ message: `El usuario con cedula ${body.cedula} ya existe.` });

            // Almacenar la imagen
            if (!file) {
                const fileData = {
                    url: `${PUBLIC_URL}/usuario-undefined.png`,
                    filename: 'usuario-undefined.png'
                };

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

                const fileSaved = await Storage.create(fileData);
                fotoId = fileSaved._id;
            }

            const userData = {
                ...body,
                foto: fotoId
            };
            
            const user = new Usuario(userData);

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(userData.password, salt);

            await user.save();

            res.status(200).json({
                username: user.username,
                cedula: user.cedula,
                nombreCompleto: user.nombreCompleto,
                telefono: user.telefono,
                direccion: user.direccion,
                email: user.email,
                estado: user.estado,
                foto: user.foto,
                tipoUsuario: user.tipoUsuario
            });

        } catch (error) {
            res.status(500).json({
                message: "Error al crear el usuario",
                error: error.message
            });
        }
    });
};

export const createLogin = async (req, res) => {

    const { email, password } = req.body;
    
    try {
        const userFound = await Usuario.findOne({ email }).populate("foto");
        if(!userFound) return res.status(404).json({ message: `El usuario '${email}' no existe.` });

        const comparePassword = await bcrypt.compare(password, userFound.password);
        if(comparePassword === false) return res.status(400).json({message: 'Contraseña o usuario incorrectos.'});

        const user = {
            _id: userFound._id,
            username: userFound.username,
            cedula: userFound.cedula,
            nombreCompleto: userFound.nombreCompleto,
            telefono: userFound.telefono,
            direccion: userFound.direccion,
            email: userFound.email,
            estado: userFound.estado,
            foto: userFound.foto,
            tipoUsuario: userFound.tipoUsuario
        };

        const token = await createAccesToken({ id: user._id, rol: user.tipoUsuario });

        res.cookie("token", token, {
            secure: true,
            sameSite: "none",
            httpOnly: false,
        });
        res.status(200).json({user, token});

    } catch (error) {

        res.status(500).json({
            error: error.message,
            message: "Error al ingresar a la aplicacion."
        });

    }
}

export const getVerityToken = async (req, res) => {

    const { token } = req.cookies;

    try {

        if(!token) return res.status(400).json({message: "Sin autorizacion"});

        jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
            if(err) return res.status(400).json({message:err});

            const foundUser = await Usuario.findOne({_id: user.id});
            if (!foundUser) return res.status(400).json({message: "Usuario no encontrado."});
            
            return res.status(200).json(foundUser);
            
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Error al verificar el token",
            error: error.message
        });
    }

}

export const createLogout =  (req, res) => {

    try {
        
        res.cookie("token", "", {
            expires: new Date(0)
        });
        res.status(200).json({message: "Sesion cerrada exitosamente!"});

    } catch (error) {
        res.status(500).json({
            message: 'Error al cerrar la sesion',
            error: error.message
        });
    }

}