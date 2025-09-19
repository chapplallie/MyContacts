import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MyContacts API',
      version: '1.0.0',
      description: 'API documentation for MyContacts project',
    },
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            password: {
              type: 'string',
            },
            email: {
              type: 'string',
              format: 'email',
            },
          },
        },
        Contact: {
            type: 'object', 
            properties: {
              firstname: {
                type: 'string',
              },
              lastname: {
                type: 'string',
              },
              email: {
                type: 'string',
                format: 'email',
              },
            },
        },
        },
      },
    },
  apis: ['./src/routes/*.ts'],
};


const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };