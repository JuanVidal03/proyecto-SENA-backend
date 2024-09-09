
import { app, server } from "../index.js";
import { getAllVariedad,
        createVariedad,
        getVariedadId,
        updateVariedadId,
        deleteVariedadId } 
from "../controller/variedad.controller.js";

import { Variedades } from "../models/variedad.model.js";
import request from "supertest";
import mongoose from "mongoose";


afterAll(async() => {
    await mongoose.connection.close();
    await server.close();
});

describe('prueba endpoint --getAllVariedad--', ()=>{

    test('should return 200 status and list of variedades', async() => {

        const response = await request(app).get("/api/variedad");
        console.log(response.body);

        expect(response.statusCode).toBe(200);
    });

    test('should return 500 if error is returned', async() => {
        const response = await request(app).get("/api/variedad")

        expect(response.statusCode).toBe(500);

    });

});

describe('prueba endpoint --getVariedadId--', () => {

    test('Should return 200 and show the variedad',async () => {
        const id = '66daff98f6ce06d51ca0d4cd'
        const response = await request(app).get(`/api/variedad/${id}`);
        console.log(response.body);

        expect(response.statusCode).toBe(200);
    });

    test('should return 404 if variedad does not exist', async () => {

        const nonExistentId = new mongoose.Types.ObjectId(); // Genera un ObjectId válido pero que no existe en la base de datos
        console.log(nonExistentId)

        const response = await request(app).get(`/api/variedad/${nonExistentId}`);

        console.log(response.body.message);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Variedad no encontrada con ese id");
      });
    
    
    test('should return 500 if there is an error', async () => {
        const idnull = null;
        const response = await request(app).get(`/api/variedad/${idnull}`)

        expect(response.statusCode).toBe(500);
    });
});

describe('prueba endpoint --createVariedad--', () => {

    test('Debería crear una nueva variedad y retornar 201', async () => {
        const newVariedad = { nombre: 'Nueva Variedad' };
    
        const response = await request(app)
          .post('/api/variedad')  
          .send(newVariedad);
        console.log(response.body);
    
        expect(response.statusCode).toBe(201);
    });

    test('Should return 400 if there is no data', async () => {
        const response = await request(app)
         .post('/api/variedad')
         .send();
        
        console.log(response.body.message);
        expect(response.statusCode).toBe(400);
    });

    test('Should return 500 if there is an error', async () => {

        const response = await request(app)
        .post('/api/variedad')

        expect(response.statusCode).toBe(500);
    })
 
});

describe('prueba endpoint --updateVariedad--', () => {

    test('Should return 200 and update the variedad', async () => {
        const id = '66db38c9cb24550c028c6263';
        const updatedVariedad = { nombre: 'Updated Variedad' };

        const response = await request(app)
         .put(`/api/variedad/${id}`)
         .send(updatedVariedad);

        console.log(response.body.message && response.body)

        expect(response.statusCode).toBe(200);
       
    });

    test('Should return 404 if variedad is not found', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        const updatedVariedad = { nombre: 'Updated Variedad2' };

        const response = await request(app)
         .put(`/api/variedad/${nonExistentId}`)
         .send(updatedVariedad);
        
         console.log(response.body.message);

        expect(response.statusCode).toBe(404);
        
    });

    test('Should return 500 if there is an error', async () =>{
        const id = null;
        const updatedVariedad = { nombre: 'Updated Variedad2' };

        const response = await request(app)
         .put(`/api/variedad/${id}`)
         .send(updatedVariedad);

        console.log(response.body.message);

        expect(response.statusCode).toBe(500);

    })

});

describe('prueba endpoint --deleteVariedad', ()=> {

    test('Should return 200 and delete variedad', async () =>{
        const id = '66db396d3b6f03e04dc858dd';
        
        const response = await request(app).delete(`/api/variedad/${id}`);
        console.log(response.body.message);

        expect(response.statusCode).toBe(200);
    });

    test('Should return 404 if variedad is not found', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();

        const response = await request(app)
         .delete(`/api/variedad/${nonExistentId}`)
        
         console.log(response.body.message);

        expect(response.statusCode).toBe(404);
        
    });

    test('Should return 500 if there is an error', async () =>{
        const id = null;

        const response = await request(app)
         .delete(`/api/variedad/${id}`)

        console.log(response.body.message);

        expect(response.statusCode).toBe(500);

    });
});