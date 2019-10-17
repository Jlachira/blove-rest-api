'use strict'
var express = require('express');
var AlertaController = require('../controllers/alerta');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/alertas',  md_auth.ensureAuth, AlertaController.getAlertas);
api.get('/alertas/:al_id/donaciones',  md_auth.ensureAuth, AlertaController.getDonacionesByAlertas);
api.get('/alertas/:al_id',  md_auth.ensureAuth, AlertaController.getAlerta);
api.post('/alertas',  md_auth.ensureAuth, AlertaController.saveAlertas);
api.put('/alertas/:al_id', md_auth.ensureAuth, AlertaController.updateAlerta);

module.exports = api;