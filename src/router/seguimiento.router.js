import {Router} from 'express';
import { createSeguimiento, deleteSeguimientoId, getAllSeguimiento, getSeguimientoById, updatedSeguimientoById } from '../controller/seguimiento.controller.js';

const seguimientoRouter = Router();

seguimientoRouter.post('/seguimiento', createSeguimiento);

seguimientoRouter.get('/seguimiento',getAllSeguimiento );

seguimientoRouter.get('/seguimiento/:id', getSeguimientoById );

seguimientoRouter.put('/seguimiento/:id',updatedSeguimientoById );

seguimientoRouter.delete('/seguimiento/:id',deleteSeguimientoId);

export default seguimientoRouter;
