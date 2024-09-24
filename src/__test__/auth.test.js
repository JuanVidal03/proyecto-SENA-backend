
import { app, server } from "../index.js";
import { createRegister,
        createLogin,
        createLogout,
        getVerityToken } 
from "../controller/auth.controller.js";

import { Usuario } from "../models/usuarios.model.js";
import request from "supertest";
import bcrypt from 'bcrypt';
import { createAccesToken } from '../utils/jwt.js';
import mongoose from "mongoose";

afterAll(async() => {
    await mongoose.connection.close();
    await server.close();
});

describe('prueba endpoint --createRegister--', () => {

    test('Should return 200 and create a new user', async () => {
        const newUser = {
            username: 'nuevoUser',
            password: 'password123',
            cedula: '123456789',
            nombreCompleto: 'Nuevo Usuario',
            telefono: '123456789',
            direccion: 'Calle Falsa 123',
            email: 'nuevo@usuario.com',
            estado: true,
            tipoUsuario: 'Administrador'
        };

        const response = await request(app)
            .post('/api/register')
            .send(newUser);

        console.log(response.body);
        
        expect(response.statusCode).toBe(200);
         
        // Verificar que el usuario se ha creado en la base de datos
        const user = await Usuario.findOne({ email: newUser.email });
        expect(user).not.toBeNull();
        expect(user.username).toBe(newUser.username);
        expect(user.cedula).toBe(newUser.cedula);
        expect(user.nombreCompleto).toBe(newUser.nombreCompleto);
        expect(user.telefono).toBe(newUser.telefono);
        expect(user.direccion).toBe(newUser.direccion);
        expect(user.estado).toBe(newUser.estado);
        expect(user.tipoUsuario).toBe(newUser.tipoUsuario);

    }, 20000); 

    test('Should return 400 if the email already exists', async () => {

        const newUser = {
            username: 'nuevoUserPrueba',
            password: 'password1234',
            cedula: '12345678045454',
            nombreCompleto: 'Nuevo UsuarioPrueba',
            telefono: '123456789455',
            direccion: 'Calle Falsa 123fdf',
            email: 'nuevo@usuario.com',
            estado: true,
            tipoUsuario: 'Administrador'
        };

        const response = await request(app)
            .post('/api/register')
            .send(newUser);

        console.log(response.body)

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe(`El usuario con email ${newUser.email} ya existe.`);
    });

    test('Should return 400 if the username already exists', async () => {

        const newUser = {
            username: 'nuevoUser',
            password: '151514',
            cedula: '68767676',
            nombreCompleto: 'ddfsdgdg',
            telefono: '57657675',
            direccion: 'Calle Falsa 1232',
            email: 'xxxxx@usuario.com',
            estado: true,
            tipoUsuario: 'Administrador'
        };

        const response = await request(app)
            .post('/api/register')
            .send(newUser);

        console.log(response.body)

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe(`El usuario con username ${newUser.username} ya existe.`);
    });

    test('Should return 400 if the cedula already exists', async () => {
       
        const newUser = {
            username: 'nuevoUserdsfs3',
            password: 'password1fsdf233',
            cedula: '123456789', // Cédula ya existe
            nombreCompleto: 'Nuevofsdfsf Usuario3',
            telefono: '1234567dfsdf893',
            direccion: 'Calle sdfsdFalsa 1233',
            email: 'nuevsfdsdfsfdfo@usuario.com',
            estado: true,
            tipoUsuario: 'Administrador'
        };

        const response = await request(app)
            .post('/api/register')
            .send(newUser);

        console.log(response.body)

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe(`El usuario con cedula ${newUser.cedula} ya existe.`);
    });

    test('Should return 500 if there is an error', async () => {
        const newUser = null;


        const response = await request(app)
            .post('/api/register')
            .send(newUser);

        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe('Error al crear el usuario');
    });

},10000);

