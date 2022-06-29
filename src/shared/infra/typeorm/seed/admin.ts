import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
    const connection = await createConnection("localhost");
    const passwordHash = await hash("admin", 8);
    const id = uuidV4();
    await connection.query(
        `INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license) values('${id}', 'admin','eduardo.setsystem@gmail.com','${passwordHash}',true,'now()','xxxx-xxxx-xxxx')`
    );

    await connection.close();
}

create().then(() => console.log("User admin created!"));
