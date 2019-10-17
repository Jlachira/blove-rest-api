'use strict'
var express = require('express');
var RolController = require('../controllers/rol');
var api = express.Router();

api.get('/roles', RolController.getRoles);
api.post('/roles',  RolController.saveRol);
api.put('/roles/:ro_id',RolController.updateRol);

module.exports = api;