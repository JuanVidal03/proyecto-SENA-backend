import {Router} from "express";
import { createVariedad, deleteVariedadId, getAllVariedad, getVariedadId, updateVariedadId } from "../controller/variedad.controller.js";

const variedadesRouter = Router()
 
variedadesRouter.post('/variedad',createVariedad)

// get all variedad
variedadesRouter.get('/variedad', getAllVariedad);

// get a variedad
variedadesRouter.get('/variedad/:id', getVariedadId);  

// uptade a variedad
variedadesRouter.put('/variedad/:id',updateVariedadId);
  
// delete a variedad
variedadesRouter.delete('/variedad/:id',deleteVariedadId);
export default variedadesRouter;