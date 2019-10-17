'use strict'
var express = require('express');
var ColabFuncController = require('../controllers/colab_funciones');
var api = express.Router();

api.get('/colab-funciones/:cf_id', ColabFuncController.getColabFuncion);
api.get('/colab-funciones', ColabFuncController.getColabFunciones);
api.get('/colab-funciones/colaboradores/:co_id/funciones', ColabFuncController.getFuncionesByColab);
api.post('/colab-funciones',  ColabFuncController.saveColabFunciones);
api.put('/colab-funciones/:cf_id', ColabFuncController.updateColabFunciones);
api.delete('/colab-funciones/:cf_id', ColabFuncController.deleteColabFunciones);

module.exports = api;