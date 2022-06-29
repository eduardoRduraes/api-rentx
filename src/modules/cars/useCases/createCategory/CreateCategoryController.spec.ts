import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

describe("Create Category Controller", () => {
    let connection: Connection;
    beforeAll(async () => {
        connection = await createConnection();

        await connection.runMigrations();

        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) values('${uuid()}', 'admin', 'admin@mail.com', '${password}', true, 'now()', 'XXX-XXX-XXX')`
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@mail.com",
            password: "admin",
        });

        const { token } = responseToken.body;
        const response = await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest",
                description: "Category Supertest",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(201);
    });

    it("should not be able to create a new category with name exists", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@mail.com",
            password: "admin",
        });

        const { token } = responseToken.body;
        const response = await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest",
                description: "Category Supertest",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(400);
    });
});
