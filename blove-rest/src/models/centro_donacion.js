'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var CentroDonacionSchema = Schema({
    cd_nombre: String,
	cd_direccion: String,
    cd_ate_hor_ini: String,
    cd_ate_hor_fin: String,
    cd_latitud: String,
    cd_longitud: String,
    in_id: { type: Schema.ObjectId, ref: 'Institucion'},
    cd_estado: String
    },
    {versionKey: false
});

module.exports = mongoose.model('centros_donaciones', CentroDonacionSchema);