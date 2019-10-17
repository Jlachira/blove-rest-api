'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UbicacionSchema = Schema({
    do_id: { type: Schema.ObjectId, ref: 'donantes'},
    ub_latitud: String,
    ub_longitud: String
},
    {versionKey: false
});

module.exports = mongoose.model('ubicaciones', UbicacionSchema);