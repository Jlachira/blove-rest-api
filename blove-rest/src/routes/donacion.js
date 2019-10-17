'use strict'
var express = require('express');
var DonacionController = require('../controllers/donacion');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/donaciones',  md_auth.ensureAuth, DonacionController.getDonaciones);
api.get('/donaciones/export-excel', DonacionController.getExportExcel);
api.get('/donaciones/:ds_id',  md_auth.ensureAuth, DonacionController.getDonacion);
api.post('/donaciones',  md_auth.ensureAuth, DonacionController.saveDonacion);
api.put('/donaciones/:ds_id', md_auth.ensureAuth, DonacionController.updateDonacion);

module.exports = api;