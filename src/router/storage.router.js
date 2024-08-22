import express from 'express'
import uploadMiddleware from '../utils/handleStorage.js';
import { createStorage } from '../controller/storage.js';
const storageRouter = express.Router();


storageRouter.post("/storage", uploadMiddleware.single("myFile"), createStorage)

export default storageRouter;