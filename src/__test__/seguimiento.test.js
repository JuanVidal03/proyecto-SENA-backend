import { app,server } from '../index.js'
import {createSeguimiento, 
        getAllSeguimiento,
        getSeguimientoById,
        getSeguimientoByMaquinaId,
        updatedSeguimientoById,
        deleteSeguimientoId,
} from '../controller/seguimiento.controller.js'
import { Seguimiento } from "../models/seguimiento.model.js";
import { Usuario } from '../models/usuarios.model.js';
import { Maquina } from "../models/maquina.model.js";
import { Lotes } from "../models/loteCafe.model.js";
import request from "supertest";
import mongoose from "mongoose";

afterAll(async() => {
    await mongoose.connection.close();
    await server.close();
});

describe('prueba endpoint --getAllSeguimiento', () => {

    test('should return 200 and show all the seguimientos', async () => {

        const response = await request(app).get("/api/seguimiento");
            
        console.log(response.body);

        expect(response.statusCode).toBe(200);
    });

    test('should return 500 if there is an error', async() => {

        const response = await request(app).get("/api/seguimiento");

        console.log(response.body.message);
        
        expect(response.statusCode).toBe(500);
    });
    
});

describe('prueba endpoint --getSeguimientoById', () => {

    test('should return 200 and show the correct seguimiento', async () => {
        const id = '66d5e7e6471eef90f97df8e2';

        const response = await request(app).get(`/api/seguimiento/${id}`);

        console.log(response.body);

        expect(response.statusCode).toBe(200);
    });

    test('should return 404 if id does not exist', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();

        const response = await request(app).get(`/api/seguimiento/${nonExistentId}`);

        console.log(response.body.message);

        expect(response.statusCode).toBe(404);
    });

    test('should return 500 if there is an error', async () => {
        const id = null;

        const response = await request(app).get(`/api/seguimiento/${id}`);

        console.log(response.body.message);

        expect(response.statusCode).toBe(500);
    });
    
});

describe('prueba endpoint --createSeguimiento--', () => {
    test('should return 201 and create a new seguimiento', async () => {
        const newSeguimiento = {
            maquina : '66f2cb0c2fc5786cf80440aa',
            loteCafe: '66e1c756805b43cff66e6209',
            operador: '66ba19a8bdfec4a672bb4727',
            datos: '66d0823558fa1c3a077efb3e'
        };

        const response = await request(app)
         .post('/api/seguimiento')
         .send(newSeguimiento);

        console.log(response.body);
        expect(response.statusCode).toBe(201);
    },10000);

    test('should return 404 if maquina does not exist', async () => {
        const nonExistentMaquina = new mongoose.Types.ObjectId();
        const newSeguimiento = {
            maquina : `${nonExistentMaquina}`,
            loteCafe: '66e1c756805b43cff66e6209',
            operador: '66ba19a8bdfec4a672bb4727',
            datos: '66d0823558fa1c3a077efb3e'
        };

        const response = await request(app)
         .post('/api/seguimiento')
         .send(newSeguimiento);

        console.log(response.body.message);  

        expect(response.statusCode).toBe(404);
    });

    test('should return 404 if loteCafe does not exist', async () => {
        const nonExistentLoteCafe = new mongoose.Types.ObjectId();
        const newSeguimiento = {
            maquina : '66f2cb0c2fc5786cf80440aa',
            loteCafe: `${nonExistentLoteCafe}`,
            operador: '66ba19a8bdfec4a672bb4727',
            datos: '66d0823558fa1c3a077efb3e'
        };

        const response = await request(app)
         .post('/api/seguimiento')
         .send(newSeguimiento);

        console.log(response.body.message);  

        expect(response.statusCode).toBe(404);
    });

    test('should return 404 if operador does not exist', async () => {
        const nonExistentOperador = new mongoose.Types.ObjectId();
        const newSeguimiento = {
            maquina : '66f2cb0c2fc5786cf80440aa',
            loteCafe: '66e1c756805b43cff66e6209',
            operador: `${nonExistentOperador}`,
            datos: '66d0823558fa1c3a077efb3e'
        };

        const response = await request(app)
         .post('/api/seguimiento')
         .send(newSeguimiento);

        console.log(response.body.message);  

        expect(response.statusCode).toBe(404);
    });

    test('should return 400 if the user doesn\'t have permission to create a process', async () => {
        const nonOperarioAdministrador = '66e0e59f03147f34dcce9926';
        const newSeguimiento = {
            maquina : '66f2cb0c2fc5786cf80440aa',
            loteCafe: '66e1c756805b43cff66e6209',
            operador: `${nonOperarioAdministrador}`,
            datos: '66d0823558fa1c3a077efb3e'
        };

        const response = await request(app)
        .post('/api/seguimiento')
        .send(newSeguimiento);

        console.log(response.body.message);  

        expect(response.statusCode).toBe(400);
    });

    test('should return 400 if the maquina is not available', async () => {
        const nonAvailableMachine = '66def6b4380c4b694df72013'; 
        const newSeguimiento = {
            maquina : `${nonAvailableMachine}`,
            loteCafe: '66e1c756805b43cff66e6209',
            operador: '66ba19a8bdfec4a672bb4727',
            datos: '66d0823558fa1c3a077efb3e'
        };

        const response = await request(app)
        .post('/api/seguimiento')
        .send(newSeguimiento);

        console.log(response.body.message);  

        expect(response.statusCode).toBe(400);
    });

    test('should return 500 if there is an error', async () => {
        const newSeguimiento = null;

        const response = await request(app)
         .post('/api/seguimiento')
         .send(newSeguimiento);

        console.log(response.body.message);

        expect(response.statusCode).toBe(500);
    });
});

describe('prueba endpoint --updateSeguimiento--', () => {
    test('should return 200 and update the correct seguimiento', async () => {
        const id = '66e86ceecc49ffc24c54af26'
        const updateSeguimiento = {
            maquina : '66def6b4380c4b694df72013',
            loteCafe:'66e1c756805b43cff66e6209',
            operador:'66cc7bf60d5f9dbdac501d96',
            datos:'66d0823558fa1c3a077efb3e'
        }

        const response = await request(app)
         .put(`/api/seguimiento/${id}`)
         .send(updateSeguimiento);

        console.log(response.body);
        expect(response.statusCode).toBe(200);
    });

    test('should return 404 if id does not exist', async () => {
        const id = new mongoose.Types.ObjectId();

        const updateSeguimiento = {
            maquina : '66def6b4380c4b694df72013',
            loteCafe:'66e1c756805b43cff66e6209',
            operador:'66ba19a8bdfec4a672bb4727',
            datos:'66d0823558fa1c3a077efb3e'
        }

        const response = await request(app)
         .put(`/api/seguimiento/${id}`)
         .send(updateSeguimiento);

        console.log(response.body);
        expect(response.statusCode).toBe(404);
    });

    test('should return 404 if the maquina does not exists', async () => {
        const id = '66e86ceecc49ffc24c54af26';
        const nonExistentMaquina = new mongoose.Types.ObjectId();

        const updateSeguimiento = {
            maquina : `${nonExistentMaquina}`,
            loteCafe:'66e1c756805b43cff66e6209',
            operador:'66ba19a8bdfec4a672bb4727',
            datos:'66d0823558fa1c3a077efb3e'
        }

        const response = await request(app)
         .put(`/api/seguimiento/${id}`)
         .send(updateSeguimiento);

        console.log(response.body);
        expect(response.statusCode).toBe(404);
    });
    
    test('should return 404 if loteCafe does not exist', async () => {
        const id = '66e86ceecc49ffc24c54af26';
        const nonExistentLoteCafe = new mongoose.Types.ObjectId();

        const updateSeguimiento = {
            maquina: '66def67a4ba3b5250efb8aab',
            loteCafe: `${nonExistentLoteCafe}`,
            operador: '66ba19a8bdfec4a672bb4727',
            datos: '66d0823558fa1c3a077efb3e'
        };

        const response = await request(app)
            .put(`/api/seguimiento/${id}`)
            .send(updateSeguimiento);

        console.log(response.body.message);
        expect(response.statusCode).toBe(404);
        
    });

    test('should return 404 if the operador does not exists', async () => {
        const id = '66e86ceecc49ffc24c54af26';
        const nonExistentOperador = new mongoose.Types.ObjectId();

        const updateSeguimiento = {
            maquina : '66def67a4ba3b5250efb8aab',
            loteCafe: '66e1c756805b43cff66e6209',
            operador:`${nonExistentOperador}`,
            datos:'66d0823558fa1c3a077efb3e'
        }

        const response = await request(app)
         .put(`/api/seguimiento/${id}`)
         .send(updateSeguimiento);

        console.log(response.body.message);
        expect(response.statusCode).toBe(404);
    });

    test('should return 500 if there is an error', async () => {
        const id = null;

        const updateSeguimiento = {
            maquina : '66def67a4ba3b5250efb8aab',
            loteCafe:'66e1c756805b43cff66e6209',
            operador:'66ba19a8bdfec4a672bb4727',
            datos:'66d0823558fa1c3a077efb3e'
        }

        const response = await request(app)
         .put(`/api/seguimiento/${id}`)
         .send(updateSeguimiento);

        console.log(response.body.message);

        expect(response.statusCode).toBe(500);
    });
});

describe('prueba endpoint --deleteSeguimiento', () => {

    test('should return 200 and delete the correct seguimiento', async () => {
        const id = '66f2e2d6311b0df49518c567';

        const response = await request(app)
        .delete(`/api/seguimiento/${id}`);

        console.log(response.body.message);

        expect(response.statusCode).toBe(200);
    });

    test('should return 404 if id doesnt exists', async() => {
        const nonExistentId = new mongoose.Types.ObjectId();

        const response = await request(app)
        .delete(`/api/seguimiento/${nonExistentId}`);

        console.log(response.body.message);

        expect(response.statusCode).toBe(404);
    });

    test('should return 500 if there is an error', async () => {
        const id = null;

        const response = await request(app)
        .delete(`/api/seguimiento/${id}`);

        console.log(response.body.message);

        expect(response.statusCode).toBe(500);
    });
    
    
});

describe('prueba endpoint --getSeguimientoByMaquinaId--', () => {
    test('should return 200 and the correct seguimiento', async () => {
        const idMaquina = '66def6b4380c4b694df72013'; 

        const response = await request(app)
            .get(`/api/seguimiento/maquina/${idMaquina}`)
            .send();

        console.log(response.body);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Seguimiento encontrado por maquina exitosamente.");
    });

    test('should return 404 if the machine ID does not exist', async () => {
        const nonExistentMachineId = new mongoose.Types.ObjectId();  

        const response = await request(app)
            .get(`/api/seguimiento/maquina/${nonExistentMachineId}`)
            .send();

        console.log(response.body.message);
        expect(response.statusCode).toBe(404);
        
    });

    test('should return 400 if there are no seguimiento records for the machine', async () => {
        const idMaquinaSinSeguimiento = '66def6c8e5ba8957ac378714';  // Un ID de máquina sin seguimientos

        const response = await request(app)
            .get(`/api/seguimiento/maquina/${idMaquinaSinSeguimiento}`)
            .send();

        console.log(response.body.message);
        expect(response.statusCode).toBe(400);
        
    });

    test('should return 500 if there is an error in the server', async () => {
        const idMaquina = null;  

        const response = await request(app)
            .get(`/api/seguimiento/maquina/${idMaquina}`)
            .send();

        console.log(response.body.message);
        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe('Error al abtener seguimiento por maquina');
    });
    
});
