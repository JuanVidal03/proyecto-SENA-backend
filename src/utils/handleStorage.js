import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    
    //donde guardamos el archivo
    destination:function (req, file, cb) {
        const pathStorage = path.join(__dirname, "../almacenamiento");
        cb(null, pathStorage);
    },

    // nombre archivo
    filename: function (req, file, cb) {
        const extFile = file.originalname.split(".").pop();
        const filename = `usuario-${req.body.cedula}.${extFile}`;
        cb(null, filename)
        
    }
});

const uploadMiddleware = multer({storage});

export default uploadMiddleware;
