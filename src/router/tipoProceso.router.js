import {Router} from 'express';
import {createTipoProceso, getAllTipoProceso, getTipoProcesoById, updateTipoProcesoById, deletetipoProcesoId} from "../controller/tipoProceso.controller.js"
const tipoProcesoRouter = Router();

// create tipos de procesos

tipoProcesoRouter.post('/tipoProceso', createTipoProceso);

// get all tipos of procesos
tipoProcesoRouter.get('/tipoProceso', getAllTipoProceso);

// get a tipos  de procesos
tipoProcesoRouter.get("/tipoProceso/:id", getTipoProcesoById);

// uptade a tipos of procesos
tipoProcesoRouter.put("/tipoProceso/:id", updateTipoProcesoById );

// delete a tipos of procesos
tipoProcesoRouter.delete("/tipoProceso/:id", deletetipoProcesoId);


export default tipoProcesoRouter;