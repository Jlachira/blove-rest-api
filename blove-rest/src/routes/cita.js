'use strict'
var express = require('express');
var CitaController = require('../controllers/cita');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/donantes/:do_id/citas', CitaController.getCitas);
api.get('/citas', CitaController.getCitasxFecha);
api.post('/citas',  CitaController.saveCita);
api.delete('/citas/:ci_id',  CitaController.deleteCita);
api.put('/citas/:ci_id',  CitaController.updateCita);

module.exports = api;