import { app, server } from "..";
import { Variedades } from "../models/variedad.model.js";
import { getAllVariedad } from "../controller/variedad.controller.js";

import request from "supertest";
import mongoose from "mongoose";


afterAll(async() => {
    await mongoose.connection.close();
    await server.close();
});


describe('Variedades enpoitns', () => {

    test('should return 200 status and list of variedades', async() => {

        const response = await request(app).get("/api/variedad");
        console.log(response.body);

        expect(response.statusCode).toBe(200);
    });
    

});
