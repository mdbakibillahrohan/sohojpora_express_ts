import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sohojpora API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Sohojpora application',
    },
    servers: [
      {
        url: 'http://localhost:'+process.env.PORT,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/modules/**/*.ts'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: express.Application): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger docs available at http://localhost:${process.env.PORT}/api-docs`);
};