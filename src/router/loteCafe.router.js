import {Router} from 'express'
import { createLoteCafe, deleteLoteCafeById, getAllLoteCafe, getLoteCafeById, updateLoteCafeById } from '../controller/loteCafe.controller';

const lotesRouter = Router();

lotesRouter.post('/loteCafe', createLoteCafe);

lotesRouter.get('/loteCafe',getAllLoteCafe);  

lotesRouter.get('/loteCafe/:id',getLoteCafeById);

lotesRouter.put('/loteCafe/:id',updateLoteCafeById );

lotesRouter.delete('/loteCafe/:id', deleteLoteCafeById);

export default lotesRouter;