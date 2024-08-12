import express from "express";
import { Usuario } from "../models/usuarios.model.js";
import { Storage } from "../models/storage.js";
import uploadMiddleware from "../utils/handleStorage.js";

const userRouter = express.Router();
const PUBLIC_URL = process.env.PUBLIC_URL;


// Ruta para actualizar un usuario por su ID
userRouter.put('/usuarios/:id', uploadMiddleware.single("foto"), async (req, res) => {
    const { id } = req.params;
    const { body, file } = req;

    let userData = { ...body };

    try {
        if (file) {
            // foto usuario, colección storage
            const fileData = {
                url: `${PUBLIC_URL}/${file.filename}`,
                filename: file.filename
            };

            // Guardar el archivo (foto) en la colección storage y vincular id al usuario
            const fileSaved = await Storage.create(fileData);
            userData.foto = fileSaved._id;
        }

        const data = await Usuario.updateOne({ _id: id }, { $set: userData });

        res.json({ message: "Usuario actualizado exitosamente", userData });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario", error });
    }
});

// Ruta para obtener todos los usuarios
userRouter.get('/usuarios', async (req, res) => {
    try {
        const data = await Usuario.find({}).populate('foto');
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener un usuario por su ID
userRouter.get('/usuarios/:id', async (req, res) => {
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
});

// Ruta para eliminar un usuario por su ID
userRouter.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Usuario.deleteOne({ _id: id });
        if (data.deletedCount === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json({ message: "Usuario aliminado exitosamente", data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default userRouter;