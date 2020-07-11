module.exports = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Basic API',
      version: '0.0.1',
      description:
        'A basic API server to act as a starting point for Labs projects',
      license: {
        name: 'MIT',
        url: 'https://en.wikipedia.org/wiki/MIT_License',
      },
    },
    tags: [
      {
        name: 'status',
        description: 'Everything about your status',
      },
      {
        name: 'profile',
        description: 'Operations for profile',
      },
    ],
    components: {
      securitySchemes: {
        okta: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'Okta Access token JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
  },
  apis: ['./api/routes/*.js'],
};
