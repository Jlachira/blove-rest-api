'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RolSchema = Schema({
    ro_nombre: String,},
    {versionKey: false
});

module.exports = mongoose.model('roles', RolSchema);