// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el módulo CORS

const app = express();
app.use(bodyParser.json());

// Middleware para manejar solicitudes OPTIONS
app.options('*', cors());

// app.use(cors());
app.use(cors({
    origin: 'http://localhost:4290',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Agrega los métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Agrega los encabezados permitidos
  }));

// Usar las rutas API
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

module.exports = app;

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en el puerto ${PORT}`);
// });
