import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import basicAuth from '../middlewares/basicAuth.js';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'AmiPets',
      version: '1.0.0',
      description: 'Documentação da API do sistema AMIPETS',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de Desenvolvimento',
      },
      {
        url: 'https://amipets.myddns.me/api',
        description: 'Servidor de Produção',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use('/api-docs', basicAuth, swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default setupSwagger;
