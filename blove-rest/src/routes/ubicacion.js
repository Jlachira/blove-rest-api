'use strict'
var express = require('express');
var UbicacionController = require('../controllers/ubicacion');
var api = express.Router();

api.get('/ubicaciones', UbicacionController.getUbicaciones);

module.exports = api;