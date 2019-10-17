'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ColabFuncionesSchema = Schema({
    cf_estado: String,
    co_id: { type: Schema.ObjectId, ref: 'colaboradores'},
    fu_id: { type: Schema.ObjectId, ref: 'funciones'}},  
    {versionKey: false
});

module.exports = mongoose.model('colab_funciones', ColabFuncionesSchema);