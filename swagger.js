const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger-output.json';

const endpointsFiles = [
    './routes/userRoutes.js',
    './routes/authorRoutes.js',
    './routes/bookRoutes.js'
 ];

     const doc = {
       info: {
         title: "API de Livros",
         description:
           "Documentação da API para gerenciamento de usuários, livros e autores",
       },
       host: "localhost:3000",
       basePath: "/api",
       schemes: ["http"],
       consumes: ["application/json"],
       produces: ["application/json"],
       tags: [
         {
           name: "Login",
           description: "Rota relativa a autentificação, gera o Bearer Token",
         },
         {
           name: "Users",
           description: "Rotas relativas a usuários",
         },
         {
           name: "Authors",
           description: "Rotas relativas a autores",
         },
         {
           name: "Books",
           description: "Rotas relativas a livros",
         },
         {
           name: "Admin",
           description: "rotas para criar administradores",
         },
         {
           name: "Listar Livros",
           description: "rotas para adcionar livros a lista de leitura",
         },
       ],
       components: {
         schemas: {
           User: {
             type: "object",
             properties: {
               nome: {
                 type: "string",
                 description: "Nome completo do usuário",
                 minLength: 3,
                 maxLength: 100,
                 example: "João Silva",
               },
               senha: {
                 type: "string",
                 description: "Senha do usuário",
                 minLength: 3,
                 maxLength: 50,
                 example: "123456",
               },
               email: {
                 type: "string",
                 description: "Email do usuário",
                 format: "email",
                 example: "joao.silva@example.com",
               },
               idade: {
                 type: "integer",
                 description: "Idade do usuário",
                 minimum: 0,
                 maximum: 150,
                 example: 25,
               },
               genero: {
                 type: "string",
                 description: "Gênero do usuário",
                 enum: ["masculino", "feminino"],
                 example: "masculino",
               },
             },
             required: ["nome", "senha", "email", "idade", "genero"],
           },
         },
         securitySchemes: {
           bearerAuth: {
             type: "http",
             scheme: "bearer",
             bearerFormat: "JWT",
             description: "Autenticação por token Bearer",
           },
         },
       },
     };

      swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
        require('./app'); 
      });