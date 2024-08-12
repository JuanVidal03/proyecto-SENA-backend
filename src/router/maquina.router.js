import { Router } from "express";
import { getAllMaquinas, createMaquina, getMaquinaById, updateMaquinaById, deleteMaquinaById } from "../controller/maquina.controller.js";

const maquinaRouter = Router();

maquinaRouter.post('/maquinas', createMaquina);
maquinaRouter.get('/maquinas', getAllMaquinas);
maquinaRouter.get('/maquinas/:id', getMaquinaById);
maquinaRouter.put('/maquinas/:id', updateMaquinaById);
maquinaRouter.delete('/maquinas/:id', deleteMaquinaById);

export default maquinaRouter;
