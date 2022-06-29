import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

describe("List Category Controller", () => {
    let connection: Connection;
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) values('ec849cdc-c14c-446e-a52c-247982d4bc81', 'admin', 'admin@mail.com', '${password}', true, 'now()', 'XXX-XXX-XXX')`
        );

        await connection.query(
            `INSERT INTO categories(id,name,description) VALUES('ab02a7c3-6fed-44e1-ac21-58d622bc12e1','suv','Utilitário esportivo');
             INSERT INTO categories(id,name,description) VALUES('f6f3bbd1-cc62-44cc-a324-67d7a2ec6a1d','sedan','Automóvel de três volumes');
             INSERT INTO categories(id,name,description) VALUES('67941d66-b111-4cf6-be71-6703cecc537d','hatch','carro compacto');`
        );
    });

    afterEach(async () => {
        await connection.query("delete from categories");
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to list all categories", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@mail.com",
            password: "admin",
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .get("/categories")
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(201);
        expect(response.body.length).toBe(3);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[2].name).toEqual("hatch");
    });

    it("should not be able to list categories is not already exists", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@mail.com",
            password: "admin",
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .get("/categories")
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(400);
    });
});
