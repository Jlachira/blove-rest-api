'use strict'
var express = require('express');
var ColaboradorController = require('../controllers/colaborador');
var api = express.Router();

api.get('/colaboradores/:co_id', ColaboradorController.getColaborador);
api.get('/colaboradores/centros-donaciones/:cd_id', ColaboradorController.getColaboradores);
api.get('/colaboradores', ColaboradorController.recuperarContrasena);
api.post('/colaboradores',  ColaboradorController.saveColaborador);
api.post('/colaboradores/login', ColaboradorController.loginColaborador);
api.put('/colaboradores/:co_id',ColaboradorController.updateColaboradores);
api.put('/colaboradores',ColaboradorController.updateContrasena);

module.exports = api;