
import { app, server } from "../index.js";
import { createMaquina,
        getAllMaquinas,
        getMaquinaById,
        updateMaquinaById,
        deleteMaquinaById } 
from "../controller/maquina.controller.js";

import { Maquina } from "../models/maquina.model.js";
import request from "supertest";
import mongoose from "mongoose";


afterAll(async() => {
    await mongoose.connection.close();
    await server.close();
});

describe('prueba endpoint --getAllMaquinas--', ()=>{

    test('should return 200 status and list of maquinas', async() => {

        const response = await request(app).get("/api/maquinas");
        console.log(response.body);

        expect(response.statusCode).toBe(200);
    });

    test('should return 500 if error is returned', async() => {
        const response = await request(app).get("/api/maquinas")

        expect(response.statusCode).toBe(500);

    });

});

describe('prueba endpoint --getMaquinaById--', () => {

    test('Should return 200 and show the maquinas',async () => {
        const id = '66cbd96115d1cb97ec3b11e6'
        const response = await request(app).get(`/api/maquinas/${id}`);
        console.log(response.body);

        expect(response.statusCode).toBe(200);
    });

    test('should return 400 if maquinas does not exist', async () => {

        const nonExistentId = new mongoose.Types.ObjectId(); // Genera un ObjectId válido pero que no existe en la base de datos
        console.log(nonExistentId)

        const response = await request(app).get(`/api/maquinas/${nonExistentId}`);

        console.log(response.body.message);

        expect(response.statusCode).toBe(400);
      });
    
    
    test('should return 500 if there is an error', async () => {
        const idnull = null;
        const response = await request(app).get(`/api/maquinas/${idnull}`)

        console.log(response.body.message)
        expect(response.statusCode).toBe(500);
    });
});

describe('prueba endpoint --createMaquina--', () => {

    test('Debería crear una nueva maquinas y retornar 201', async () => {
        
        const response = await request(app)
          .post('/api/maquinas')  
          
        console.log(response.body);
    
        expect(response.statusCode).toBe(201);
    });

    test('Should return 500 if there is an error', async () => {

        const response = await request(app)
        .post('/api/maquinas')

        expect(response.statusCode).toBe(500);
    })
 
});

describe('prueba endpoint --updateMaquina--', () => {

    test('Should return 200 and update the maquinas', async () => {
        const id = '66def67a4ba3b5250efb8aa6';
        const updatedMaquina = { estado: "En Mantenimiento" };

        const response = await request(app)
         .put(`/api/maquinas/${id}`)
         .send(updatedMaquina);

        console.log(response.body.message && response.body)

        expect(response.statusCode).toBe(200);
       
    });

    test('Should return 404 if maquinas is not found', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        const updatedMaquina = { nombre: 'Updated maquina' };

        const response = await request(app)
         .put(`/api/maquinas/${nonExistentId}`)
         .send(updatedMaquina);
        
         console.log(response.body.message);

        expect(response.statusCode).toBe(404);
        
    });

    test('Should return 500 if there is an error', async () =>{
        const id = null;
        const updatedMaquina = { nombre: 'Updated maquinas2' };

        const response = await request(app)
         .put(`/api/maquinas/${id}`)
         .send(updatedMaquina);

        console.log(response.body.message);

        expect(response.statusCode).toBe(500);

    })

});

describe('prueba endpoint --deleteMaquina', ()=> {

    test('Should return 200 and delete maquinas', async () =>{
        const id = '66def6c9e5ba8957ac378718';
        
        const response = await request(app).delete(`/api/maquinas/${id}`);
        console.log(response.body.message);

        expect(response.statusCode).toBe(200);
    });

    test('Should return 404 if maquinas is not found', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();

        const response = await request(app)
         .delete(`/api/maquinas/${nonExistentId}`)
        
         console.log(response.body.message);

        expect(response.statusCode).toBe(404);
        
    });

    test('Should return 500 if there is an error', async () =>{
        const id = null;

        const response = await request(app)
         .delete(`/api/maquinas/${id}`)

        console.log(response.body.message);

        expect(response.statusCode).toBe(500);

    });
});