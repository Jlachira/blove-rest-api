'use strict'
var express = require('express');
var CampaniasController = require('../controllers/campanias');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/campanias/:ca_id', CampaniasController.getCampania);
api.get('/campanias/:ca_estado?', CampaniasController.getCampanias);
api.post('/campanias',  CampaniasController.saveCampania);
api.put('/campanias/:ca_id', CampaniasController.updateCampania);

module.exports = api;