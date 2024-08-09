// importando librerias
import express from "express"
// importar modelos
import { Usuario } from "../models/usuarios.js";
import { defaults } from "joi";


// rutas de la aplicacion
const router = express.Router();


router.post('/login', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await usuario.findOne({ email });
        
        res.json(user);

    } catch (error) {
        console.log('Error al ingresar a la aplicacion!');
        console.log(error);
        res.status(400).json(error);
    }
})




export default router