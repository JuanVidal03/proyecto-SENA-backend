import fs from 'fs';
import path from 'path';

import { Usuario } from '../models/usuarios.model.js';
import { Storage } from '../models/storage.model.js'

const PUBLIC_URL = process.env.PUBLIC_URL;

export const getAllUsuarios = async (req,res) => {

    try {
        
        const users = await Usuario.find({}).select('-password').populate("foto");

        res.status(200).json({
            message: "Usuarios obtenidos correctamente.",
            users
        })

    } catch (error) {
        res.status(500).json({
            message: 'An error occurred get the users',
            error: error.message
        });
    }

}

export const getUsuarioByID = async (req,res) =>{
    const { id } = req.params;
    try {

        const data = await Usuario.findById(id).populate('foto');
        
        if (!data) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json(data);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { body, file } = req;

    let userData = { ...body };

    try {
        // Obtener el usuario actual para acceder a la imagen existente
        const usuarioActual = await Usuario.findById(id).populate('foto');

        if (!usuarioActual) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (file) {

            // Eliminar la imagen anterior si existe
            if (usuarioActual.foto) {
                const oldImagePath = path.resolve(`almacenamiento/${usuarioActual.foto.filename}`);
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error('Error al eliminar la imagen anterior:', err);
                    }
                });

                // Eliminar el registro de la imagen anterior de la colección de Storage
                await Storage.findByIdAndDelete(usuarioActual.foto._id);
            }

            // Subir nueva imagen
            const fileData = {
                url: `${PUBLIC_URL}/${file.filename}`,
                filename: file.filename
            };

            const fileSaved = await Storage.create(fileData);
            userData.foto = fileSaved._id;

            
        }

        // Actualizar el usuario con la nueva información
        await Usuario.updateOne({ _id: id }, { $set: userData });

        res.status(200).json({ message: "Usuario actualizado exitosamente", userData });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario", error });
    }
};

export const borrarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await Usuario.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
    }
}