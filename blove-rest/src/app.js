'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
//llamar a router como si fuera un modulo
var alerta_routes = require('./routes/alerta');
var donante_routes = require('./routes/donante');
var cita_routes = require('./routes/cita');
var institucion_routes = require('./routes/institucion');
var colaborador_routes = require('./routes/colaborador');
var centro_donacion_routes = require('./routes/centro_donacion');
var campania_routes = require('./routes/campania');
var funcion_routes = require('./routes/funcion');
var colfun_routes = require('./routes/colab_funciones');
var ubicacion_routes = require('./routes/ubicacion');
var donaciones_routes = require('./routes/donacion');

//lo que hace es que convierte a objeto JSON los datos que nos 
//llegan por peticiones HTTP

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Configurar las cabeceras http
//Permitimos el acceso a todos los dominios,acceso a nuestra API
app.use((req,res,next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

//rutas bases
//en use hacemos como un tipo de middleware para que cualquier llamada
//via http va estar antes: /api y luego leerá las rutas
app.use('/api', alerta_routes);
app.use('/api', donante_routes);
app.use('/api', cita_routes);
app.use('/api', institucion_routes);
app.use('/api', colaborador_routes);
app.use('/api', centro_donacion_routes);
app.use('/api', campania_routes);
app.use('/api', funcion_routes);
app.use('/api', colfun_routes);
app.use('/api', ubicacion_routes);
app.use('/api', donaciones_routes);

//exportar el modulo
module.exports = app;