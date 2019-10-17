'use strict'
var express = require('express');
var CentroDonacionController = require('../controllers/centro_donacion');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


api.get('/centros-donaciones', CentroDonacionController.getCentrosDonaciones);
api.get('/centros-donaciones/:cd_id', CentroDonacionController.getCentroDonacion);
api.get('/centros-donaciones/:cd_id/campanias', CentroDonacionController.getCampaniasByCentros);
api.get('/centros-donaciones/:cd_id/alertas', CentroDonacionController.getAlertasByCentros);
api.get('/centros-donaciones/:cd_id/colaboradores', CentroDonacionController.getColaboradoresByCentros);
api.post('/centros-donaciones',  CentroDonacionController.saveCentroDonacion);
api.put('/centros-donaciones/:cd_id',CentroDonacionController.updateCentroDonacion);

module.exports = api;