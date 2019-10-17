'use strict'
var express = require('express');
var InstitucionController = require('../controllers/institucion');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/instituciones/:in_id', InstitucionController.getInstitucion);
api.get('/instituciones', InstitucionController.getInstituciones);
api.get('/instituciones/:in_id/centros', InstitucionController.getCentrosByInstitucion);
api.post('/instituciones',  InstitucionController.saveInstitucion);
api.put('/instituciones/:in_id',InstitucionController.updateInstitucion);


module.exports = api;