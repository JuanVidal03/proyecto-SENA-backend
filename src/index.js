// dependecias
import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import morgan from "morgan";

const app = express();
config();
app.use(morgan("dev"));

// mongoDB
import { mongoConnection } from "./DB/mongoDB.js";

// rutas
import userRouter from "./router/usuarios.router.js";
import variedadesRouter from "./router/variedad.router.js";
import tipoProcesoRouter from "./router/tipoProceso.router.js";
import maquinaRouter from "./router/maquina.router.js";
import lotesRouter from "./router/loteCafe.router.js";
import seguimientoRouter from "./router/seguimiento.router.js";
import datosRouter from "./router/datos.router.js";
import authRouter from "./router/auth.router.js";
import storageRouter from "./router/storage.router.js";

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.MOVIL_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200
}));
app.use(cookieParser());

// implementacion de las rutas
app.use("/api", userRouter);
app.use("/api", variedadesRouter);
app.use("/api", tipoProcesoRouter);
app.use("/api", maquinaRouter);
app.use("/api", lotesRouter);
app.use("/api", seguimientoRouter);
app.use("/api", datosRouter);
app.use("/api", authRouter);
app.use("/api", storageRouter);

// Los recursos públicos salen de la carpeta almacenamiento
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'almacenamiento')));


app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));
mongoConnection();