const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Blog API - INF222', version: '1.0.0' },
  },
  apis: ['./routes/articles.js'],
};

module.exports = swaggerJsdoc(options);