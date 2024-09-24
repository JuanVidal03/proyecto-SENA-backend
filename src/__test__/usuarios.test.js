
import { app, server } from "../index.js";
import { getAllUsuarios,
        getUsuarioByID,
        actualizarUsuario,
        borrarUsuario } 
from "../controller/usuarios.controller.js";

import { Usuario } from "../models/usuarios.model.js";
import request from "supertest";
import mongoose from "mongoose";


afterAll(async() => {
    await mongoose.connection.close();
    await server.close();
});


describe('prueba endpoint --getAllUsuarios--', ()=>{

    test('should return 200 status and list of usuarios', async() => {

        const response = await request(app).get("/api/usuarios");
        console.log(response.body);

        expect(response.statusCode).toBe(200);
    });

    test('should return 500 if error is returned', async() => {
        const response = await request(app).get("/api/usuarios")

        console.log(response.body.message);
        expect(response.statusCode).toBe(500);

    });

});

describe('prueba endpoint --getUsuarioByID--', () => {

    test('Should return 200 and show the usuario',async () => {
        const id = '66cca4ac5f254cf250e94e23'
        const response = await request(app).get(`/api/usuarios/${id}`);
        console.log(response.body);

        expect(response.statusCode).toBe(200);
    });

    test('should return 404 if usuario does not exist', async () => {

        const nonExistentId = new mongoose.Types.ObjectId(); // Genera un ObjectId válido pero que no existe en la base de datos
        console.log(nonExistentId)

        const response = await request(app).get(`/api/usuarios/${nonExistentId}`);

        console.log(response.body.message);

        expect(response.statusCode).toBe(404);
    });
    
    
    test('should return 500 if there is an error', async () => {
        const idnull = null;
        const response = await request(app).get(`/api/usuarios/${idnull}`)

        console.log(response.body.message)
        expect(response.statusCode).toBe(500);
    });
});

describe('prueba endpoint --actualizarUsuario--', () => {

    test('Should return 200 and update the usuario', async () => {
        const id = '66cca4ac5f254cf250e94e23';
        const updateusuarios = { nombreCompleto: "Libni Bernate" };

        const response = await request(app)
         .put(`/api/usuarios/${id}`)
         .send(updateusuarios);

        console.log(response.body.message && response.body)

        expect(response.statusCode).toBe(200);
       
    });

    test('Should return 404 if usuarios is not found', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        const updateusuarios = { nombreCompleto: 'Updated usuario' };

        const response = await request(app)
         .put(`/api/usuarios/${nonExistentId}`)
         .send(updateusuarios);
        
         console.log(response.body.message);

        expect(response.statusCode).toBe(404);
        
    });

    test('Should return 500 if there is an error', async () =>{
        const id = null;
        const updateusuarios = { nombreCompleto: 'Updated usuarios2' };

        const response = await request(app)
         .put(`/api/usuarios/${id}`)
         .send(updateusuarios);

        console.log(response.body.message);

        expect(response.statusCode).toBe(500);

    });

});

describe('prueba endpoint --borrarUsuario', ()=> {

    test('Should return 200 and delete usuario', async () =>{
        const id = '66ee054185567bda56dc6fb7';
        
        const response = await request(app).delete(`/api/usuarios/${id}`);
        console.log(response.body.message);

        expect(response.statusCode).toBe(200);
    });

    test('Should return 404 if usuario is not found', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();

        const response = await request(app)
         .delete(`/api/usuarios/${nonExistentId}`)
        
         console.log(response.body.message);

        expect(response.statusCode).toBe(404);
        
    });

    test('Should return 500 if there is an error', async () =>{
        const id = null;

        const response = await request(app)
         .delete(`/api/usuarios/${id}`)

        console.log(response.body.message);

        expect(response.statusCode).toBe(500);

    });
});