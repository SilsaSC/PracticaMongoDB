const express = require('express'); //de esta forma se importa en node
const cors = require('cors');
require('dotenv').config();

//Creando el servidor express
const app = express();
//Configuración de CORS
app.use(cors());
//Lectura y parseo del body
app.use(express.json());
const { dbConection } = require('./config/database');


//Conexion a la
dbConection();
//console.log(process.env);


//Rutas de la API
app.use('/api/usuarios', require('./routes/usuarios.route'));
app.use('/api/login', require('./routes/auth.route'));
app.use('/api/ponentes', require('./routes/ponentes.route'));
app.use('/api/salas', require('./routes/salas.route'));
app.use('/api/certificados', require('./routes/certificados.route'));
app.use('/api/locales', require('./routes/locales.route'));
app.use('/api/webinars', require('./routes/webinars.route'));
app.use('/api/talleres', require('./routes/talleres.route'));
app.use('/api/facturas', require('./routes/facturas.route'));
app.use('/api/asistentes', require('./routes/asistentes.route'));
app.use('/api/buscar', require('./routes/busquedas.route'));



//Para levantar el servidor
//app.listen(3000, () => {
//  console.log('Servidor corriendo en el puerto ' + 3000)})
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
})