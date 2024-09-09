
import { app, server } from "../index.js";
import { createTipoProceso,
        getAllTipoProceso,
        getTipoProcesoById,
        updateTipoProcesoById,
        deletetipoProcesoId } 
from "../controller/tipoProceso.controller.js";

import { TiposProcesos } from "../models/tipoProceso.model.js";
import request from "supertest";
import mongoose from "mongoose";


afterAll(async() => {
    await mongoose.connection.close();
    await server.close();
});

describe('prueba endpoint --getAlltipoProceso--', ()=>{

    test('should return 200 status and list of tipoProceso', async() => {

        const response = await request(app).get("/api/tipoProceso");
        console.log(response.body);

        expect(response.statusCode).toBe(200);
    });

    test('should return 500 if error is returned', async() => {
        const response = await request(app).get("/api/tipoProceso")

        expect(response.statusCode).toBe(500);

    });

});

describe('prueba endpoint --getTipoProcesoById--', () => {

    test('Should return 200 and show the tipoProceso',async () => {
        const id = '66bce0180557a55dbf3e1ab6'
        const response = await request(app).get(`/api/tipoProceso/${id}`);
        console.log(response.body);

        expect(response.statusCode).toBe(200);
    });

    test('should return 404 if tipoProceso does not exist', async () => {

        const nonExistentId = new mongoose.Types.ObjectId(); // Genera un ObjectId válido pero que no existe en la base de datos
        console.log(nonExistentId)

        const response = await request(app).get(`/api/tipoProceso/${nonExistentId}`);

        console.log(response.body.message);

        expect(response.statusCode).toBe(404);
      });
    
    
    test('should return 500 if there is an error', async () => {
        const idnull = null;
        const response = await request(app).get(`/api/tipoProceso/${idnull}`)

        console.log(response.body.message)
        expect(response.statusCode).toBe(500);
    });
});

describe('prueba endpoint --createTipoProceso--', () => {

    test('Debería crear un nuevo tipoProceso y retornar 201', async () => {

        const newTipoProceso = { nombre: 'Nuevo Tipo Proceso' }; //tipoProceso tiene tambien descripción
        //pero tiene un valor por default, por lo tanto no es necesario ponerla.

        const response = await request(app)
          .post('/api/tipoProceso')
          .send(newTipoProceso);
          
        console.log(response.body);
    
        expect(response.statusCode).toBe(201);
    });

    test('Should return 500 if there is an error', async () => {

        const response = await request(app)
        .post('/api/tipoProceso')

        expect(response.statusCode).toBe(500);
    })
 
});

describe('prueba endpoint --updateTipoProcesoById--', () => {

    test('Should return 200 and update the tipoProceso', async () => {
        const id = '66defc8b665281eb3da4bf20';
        const updateTipoProceso = { nombre: "tipoProceso4" };

        const response = await request(app)
         .put(`/api/tipoProceso/${id}`)
         .send(updateTipoProceso);

        console.log(response.body.message && response.body)

        expect(response.statusCode).toBe(200);
       
    });

    test('Should return 404 if tipoProceso is not found', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        const updateTipoProceso = { nombre: 'Updated proceso' };

        const response = await request(app)
         .put(`/api/tipoProceso/${nonExistentId}`)
         .send(updateTipoProceso);
        
         console.log(response.body.message);

        expect(response.statusCode).toBe(404);
        
    });

    test('Should return 500 if there is an error', async () =>{
        const id = null;
        const updateTipoProceso = { nombre: 'Updated tipoProceso2' };

        const response = await request(app)
         .put(`/api/tipoProceso/${id}`)
         .send(updateTipoProceso);

        console.log(response.body.message);

        expect(response.statusCode).toBe(500);

    })

});

describe('prueba endpoint --deletetipoProcesoId', ()=> {

    test('Should return 200 and delete tipoProceso', async () =>{
        const id = '66defc8b665281eb3da4bf20';
        
        const response = await request(app).delete(`/api/tipoProceso/${id}`);
        console.log(response.body.message);

        expect(response.statusCode).toBe(200);
    });

    test('Should return 404 if tipoProceso is not found', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();

        const response = await request(app)
         .delete(`/api/tipoProceso/${nonExistentId}`)
        
         console.log(response.body.message);

        expect(response.statusCode).toBe(404);
        
    });

    test('Should return 500 if there is an error', async () =>{
        const id = null;

        const response = await request(app)
         .delete(`/api/tipoProceso/${id}`)

        console.log(response.body.message);

        expect(response.statusCode).toBe(500);

    });
});