import { app,server } from '../index.js'
import {Lotes} from '../models/loteCafe.model.js'
import { TiposProcesos } from "../models/tipoProceso.model.js";
import { Usuario } from '../models/usuarios.model.js';
import { Variedades } from '../models/variedad.model.js';
import {createLoteCafe,
        getAllLoteCafe,
        getLoteCafeById,
        updateLoteCafeById,
        deleteLoteCafeById
} from '../controller/loteCafe.controller.js'
import request from "supertest";
import mongoose from "mongoose";

afterAll(async() => {
    await mongoose.connection.close();
    await server.close();
});


describe('prueba endpoint --getAllLoteCafe--', () => {

    test('should return 200 and list of loteCafe', async() => {

        const response = await request(app).get("/api/loteCafe");
        console.log(response.body);

        expect(response.statusCode).toBe(200);
    });

    
    test('should return 500 if there is an error', async() => {

        const response = await request(app).get("/api/loteCafe");
        console.log(response.message);

        expect(response.statusCode).toBe(500);
    });
    
});

describe('prueba endpoint --getLoteCafeById--', () => {
   
    test('should return 200 and show the correct loteCafe', async() => {
        const id = '66bcb9d0ddc717a8222045f5';
        const response = await request(app).get(`/api/loteCafe/${id}`)

        console.log(response.body);
    
        expect(response.statusCode).toBe(200);
    });

    test('should return 404 if id is not found', async() => {
        const nonExistentId = new mongoose.Types.ObjectId();

        const response = await request(app).get(`/api/loteCafe/${nonExistentId}`)

        console.log(response.body.message);

        expect(response.statusCode).toBe(404);
    });

    test('should return 500 if there is an error', async() => {
        const idnull = null;

        const response = await request(app).get(`/api/loteCafe/${idnull}`)

        console.log(response.body.message);

        expect(response.statusCode).toBe(500);
    });
});

describe ('prueba endpoint --createLoteCafe', () => {

    test('should return 201 and create a new LoteCafe', async() => {
        const newLoteCafe = {
            peso : 80,
            proveedor:'66e0e59f03147f34dcce9926',
            tipoProceso:'66bcad740a9ac2dca24ae00c',
            variedad:'66bcb353f1d5eddcc8be7b57',
        }
        
        const response = await request(app)
        .post("/api/loteCafe")
        .send(newLoteCafe);

        console.log(response.body);

        expect(response.statusCode).toBe(201);

    });

    test('should return 400 if usuario is not type:proveedor', async () => {
        const newLoteCafe = {
            peso : 80,
            proveedor:'66ba187174de72f45f4a9a81',
            tipoProceso:'66bcad740a9ac2dca24ae00c',
            variedad:'66bcb353f1d5eddcc8be7b57',
        }

        const response = await request(app)
        .post("/api/loteCafe")
        .send(newLoteCafe);

        console.log(response.body.message);
        
        expect(response.statusCode).toBe(400);
    });

    test('should return 404 if proveedor does not exist', async () => {
        const nonExistentProveedor = new mongoose.Types.ObjectId(); 
        const newLoteCafe = {
            peso : 80,
            proveedor: `${nonExistentProveedor}`,
            tipoProceso:'66bcad740a9ac2dca24ae00c',
            variedad:'66bcb353f1d5eddcc8be7b57',
        }
        
        const response = await request(app)
        .post("/api/loteCafe")
        .send(newLoteCafe);

        console.log(response.body.message);
        
        expect(response.statusCode).toBe(404);
    });

    test('should return 404 if tipoProceso does not exist', async () => {
        const nonExistentTipoProceso = new mongoose.Types.ObjectId(); 
        const newLoteCafe = {
            peso : 80,
            proveedor: '66e0e59f03147f34dcce9926',
            tipoProceso:`${nonExistentTipoProceso}`,
            variedad:'66bcb353f1d5eddcc8be7b57',
        }
        
        const response = await request(app)
        .post("/api/loteCafe")
        .send(newLoteCafe);

        console.log(response.body.message);
        
        expect(response.statusCode).toBe(404);
    });

    test('should return 404 if variedad does not exist', async () => {
        const nonExistentVariedad = new mongoose.Types.ObjectId(); 
        const newLoteCafe = {
            peso : 80,
            proveedor: '66e0e59f03147f34dcce9926',
            tipoProceso:'66bcad740a9ac2dca24ae00c',
            variedad:`${nonExistentVariedad}`,
        }
        
        const response = await request(app)
        .post("/api/loteCafe")
        .send(newLoteCafe);

        console.log(response.body.message);
        
        expect(response.statusCode).toBe(404);
    });

    test('should return 500 if there is an error', async () => {
        const newLoteCafe = '';
        
        const response = await request(app)
        .post('/api/loteCafe')
        .send(newLoteCafe);

        console.log(response.body.message);

        expect(response.statusCode).toBe(500);
    });
});

describe('prueba endpoint --updateLoteCafeById',() => {

    test('should return 200 and update the loteCafe' , async () => {
        const id='66e1c9f083b3c29a4bf68b3c'
        const updateLoteCafe = { 
            peso : 70,
            proveedor:'66e0e59f03147f34dcce9926',
            tipoProceso:'66bcad740a9ac2dca24ae00c',
            variedad:'66bcb353f1d5eddcc8be7b57',
        }

        const response = await request(app)
        .put(`/api/loteCafe/${id}`)
        .send(updateLoteCafe);

        console.log(response.body);
        console.log(response.body.message);

        expect(response.statusCode).toBe(200);
    },10000);

    test('should return 404 if id is not found', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();

        const updateLoteCafe = { peso : 85 }
        const response = await request(app)
        .put(`/api/loteCafe/${nonExistentId}`)
        .send(updateLoteCafe);

        console.log(response.body.message);
        
        expect(response.statusCode).toBe(404);
    });

    test('should return 400 if usuario is not type:proveedor', async () => {
        const id='66e1c9f083b3c29a4bf68b3c'
        const updateLoteCafe = { proveedor:'66ba187174de72f45f4a9a81' } // id de un usuario de tipo administrador

        const response = await request(app)
        .put(`/api/loteCafe/${id}`)
        .send(updateLoteCafe);

        console.log(response.body.message);
        
        expect(response.statusCode).toBe(400);
    });


    test('should return 404 if proveedor does not exist', async () => {
        const id = '66e1c9f083b3c29a4bf68b3c';
        const nonExistentProveedor = new mongoose.Types.ObjectId();

        const updateLoteCafe = { proveedor:`${nonExistentProveedor}` } 

        const response = await request(app)
        .put(`/api/loteCafe/${id}`)
        .send(updateLoteCafe);

        console.log(response.body.message);
        
        expect(response.statusCode).toBe(404);
    });

    test('should return 404 if tipoProceso does not exist', async () => {
        const id = '66e1c9f083b3c29a4bf68b3c';
        const nonExistentTipoProceso = new mongoose.Types.ObjectId();

        const updateLoteCafe = { tipoProceso:`${nonExistentTipoProceso}` }

        const response = await request(app)
        .put(`/api/loteCafe/${id}`)
        .send(updateLoteCafe);

        console.log(response.body.message);
        
        expect(response.statusCode).toBe(404);
    });

    test('should return 404 if variedad does not exist', async () => {
        const id = '66e1c9f083b3c29a4bf68b3c';
        const nonExistentVariedad = new mongoose.Types.ObjectId();

        const updateLoteCafe = { variedad:`${nonExistentVariedad}` }

        const response = await request(app)
        .put(`/api/loteCafe/${id}`)
        .send(updateLoteCafe);

        console.log(response.body.message);
        
        expect(response.statusCode).toBe(404);
    });

    test('should return 500 is there is an error', async () => {
        const id = null;
        const updateLoteCafe = { peso : 85 }

        const response = await request(app)
        .put(`/api/loteCafe/${id}`)
        .send(updateLoteCafe);

        console.log(response.body.message);
        
        expect(response.statusCode).toBe(500);
    });
});

describe('prueba endpoint --deleteLoteCafeById',() => {

    test ('should return 200 and delete the correct loteCafe', async () => {
        const id = '66e1cde783b3c29a4bf68b7d';

        const response = await request(app)
        .delete(`/api/loteCafe/${id}`);

        console.log(response.body.message);

        expect(response.statusCode).toBe(200);
    });

    test('Should return 404 if id deoes not exist', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        
        const response = await request(app)
        .delete(`/api/loteCafe/${nonExistentId}`);

        console.log(response.body.message);

        expect(response.statusCode).toBe(404);
        
    });

    test('Should return 500 if there is an error', async () => {
        const id = null;

        const response = await request(app)
        .delete(`/api/loteCafe/${id}`);

        console.log(response.body.message);

        expect(response.statusCode).toBe(500);

    });
});

