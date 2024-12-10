const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger-output.json';

const endpointsFiles = [
    './routes/userRoutes.js',
    './routes/authorRoutes.js',
    './routes/bookRoutes.js'
 ];

     const doc = {
        info: {
          title: 'API de Livros',
          description: 'Documentação da API para gerenciamento de usuários, livros e autores',
        },
        host: 'localhost:3000',
        basePath: '/api',
        schemes: ['http'],
      };



      swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
        require('./app'); 
      });