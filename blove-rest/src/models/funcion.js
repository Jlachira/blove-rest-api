'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FuncionSchema = Schema({
    fu_controller: String,
    fu_action: String,
    fu_opcion:String,
    fu_icono: String,
    fu_grupo: String,
    fu_es_visible: String,}, 
    {versionKey: false
});

module.exports = mongoose.model('funciones', FuncionSchema);