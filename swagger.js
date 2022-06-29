const swaggerAutogen = require("swagger-autogen")({ openapi: '3.0.0' });


const outputFile = "./src/swagger.json";
const index = "src/routes/index.ts";

const file = [
   index
];

const doc = {
    info:{
        title: "Rentx Documentation",
        description: "Projeto criando aplicação de uma API rest capítulo 03",
        version: "1.0.0",
        contact:{
            "name": "Eduardo R. Durães",
            "email": "eduardodurae.bsi@gmail.com"
        }
    },
    host:"http://localhost:3333",
    schemes: ['http'],
    consumes:['application/json','multipart/form-data'],
    produces:['application/json','multipart/form-data'],

}


swaggerAutogen(outputFile, file, doc)
