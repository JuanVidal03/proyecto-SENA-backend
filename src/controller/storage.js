import { Storage } from "../models/storage.model.js";
const PUBLIC_URL = process.env.PUBLIC_URL;

    
//Crear un nuevo archivo y almacenarlo
export const createStorage = async (req, res) => {
    const { body, file } = req;

    // Verifica si se recibió un archivo
    if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const fileData = {
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`, 
    };

    try {
        const data = await Storage.create(fileData);    
        res.status(201).json({ message: "Archivo creado exitosamente", data });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el archivo", error });
    }
};