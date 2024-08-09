// importar librerias
import mongoose from 'mongoose';

export const mongoConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('<<< DB CONECTADA >>>');

    } catch (error) {
        console.log('<<< Error al conectar mongoDB >>>');
    }
}