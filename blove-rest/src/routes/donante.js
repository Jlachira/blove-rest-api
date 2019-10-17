'use strict'
var express = require('express');
var DonanteController = require('../controllers/donante');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/donantes/:do_id', DonanteController.getDonante);
api.put('/donantes/:do_id', DonanteController.updateDonante);
api.get('/donantes/:do_id/donaciones',  md_auth.ensureAuth, DonanteController.getDonacionesByDonantes);
api.put('/donantes/:do_id/silenciar-notificaciones',  md_auth.ensureAuth, DonanteController.silentNotification);
api.get('/donantes', md_auth.ensureAuth,DonanteController.getDonantes);
api.post('/donantes',  DonanteController.saveDonante);
api.post('/authdonante',  DonanteController.login);

module.exports = api;