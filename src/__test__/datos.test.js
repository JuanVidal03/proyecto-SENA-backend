import { app, server } from "../index.js";
import {
    getAllDatos,
    getDatosById,
    createDatos,
    updateDatos,
    deleteDatos
    } 
from "../controller/datos.controller.js";
import { Seguimiento } from "../models/seguimiento.model.js";
import request from "supertest";
import bcrypt from 'bcrypt';
import mongoose from "mongoose";

afterAll(async() => {
    await mongoose.connection.close();
    await server.close();
});


describe('prueba endpoint --createDatos--', () => {
    test('should return 201 and create a new dato', async() => {
        const newDato = {
            IdSeguimiento:"66e86ceecc49ffc24c54af26",
            temperaturaAmbiente:"30",
            temperaturaSensor:"50",
            idMaquina:"66def67a4ba3b5250efb8aab",
            rotor: true,
            motor: true,
        }

        const response = await request(app)
         .post('/api/datos')
         .send(newDato);

        console.log(response.body.message);
        
        expect(response.statusCode).toBe(201);

    });
    test('should return 404 if seguimiento doesnt exists', async() => {
        const nonExistentSeguimiento = new mongoose.Types.ObjectId();
        const newDato = {
            IdSeguimiento:`${nonExistentSeguimiento}`,
            temperaturaAmbiente:"30",
            temperaturaSensor:"50",
            idMaquina:"66def67a4ba3b5250efb8aab",
            rotor: true,
            motor: true,
           
        }

        console.log(response.body.message);

        const response = await request(app)
        .post('/api/datos/')
        .send(newDato);

        expect(response.statusCode).toBe(404);
    });

    test('should return 400 if there is an error', async() => {
        const newDato = null;

        const response = await request(app)
        .post('/api/datos/')
        .send(newDato);

        console.log(response.body.message);

        expect(response.statusCode).toBe(400);
    });
    
});

// describe('prueba endpoint --getAllDatos--', () => {
//     test('should return 200 and show all the datos', async() => {
//         const response = await request(app).get('/api/datos')
        
//         console.log(response.body);

//         expect(response.statusCode).toBe(200);
//     });
    
// });



// describe('prueba endpoint --deleteDatos--', () => {
//     test('should return 200 and delete the correct datos',async () => {
//         const id = "66f2ec27c211dbd1011d8191"

//         const response = await request(app).delete(`/api/datos/${id}`)

//         console.log(response.body);

//         expect(response.statusCode).toBe(200);
//     });
    
// });



