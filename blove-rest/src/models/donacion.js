'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DonacionSchema = Schema({
    ds_estado: String,
    ds_fec_acep: String,
    ds_fec_mue: String,
    ds_fec_rea: String,
    ds_puntos: Number,
    do_id: { type: Schema.ObjectId, ref: 'donantes'},
    al_id: { type: Schema.ObjectId, ref: 'alertas'}},
    {versionKey: false
});

module.exports = mongoose.model('donaciones', DonacionSchema);