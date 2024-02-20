const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const { initDatabase } = require('./database');
const memberRouter = require('./routes/memberRouter');
const bookRouter = require('./routes/bookRouter');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup 
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'API documentation for Library service',
      contact: {
        name: 'Your Name',
      },
    },
    servers: [{ url: `http://localhost:${PORT}`, description: 'Local server' }],
  },
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

initDatabase();


app.use('/members', memberRouter);
app.use('/books', bookRouter);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
