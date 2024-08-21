import {Router} from 'express'
const authRouter = Router();
import { createLogin, createLogout, createRegister, getVerityToken } from '../controller/auth.controller.js';

authRouter.post('/register', createRegister);

authRouter.post('/login', createLogin);

authRouter.get('/verify-token',getVerityToken );

authRouter.post('/logout',createLogout);

export default authRouter;