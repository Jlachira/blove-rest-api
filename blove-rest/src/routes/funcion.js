'use strict'
var express = require('express');
var FuncionController = require('../controllers/funcion');
var api = express.Router();

api.get('/funciones:fu_id', FuncionController.getFuncion);
api.get('/funciones', FuncionController.getFunciones);
api.get('/funciones/grupo', FuncionController.getFuncionesByGrupo);
api.post('/funciones',  FuncionController.saveFuncion);
api.put('/funciones:fu_id', FuncionController.updateFuncion);

module.exports = api;