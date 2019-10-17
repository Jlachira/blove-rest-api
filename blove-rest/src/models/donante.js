'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;


var DonanteSchema = Schema({
    do_nombre: String,
	do_apellido: String,
	do_fec_nac: String,
	do_genero: String,
	do_correo: String,
	do_celular: String,
	do_tip_sang: String,
	do_fec_ult_don: String,
	do_puntos: Number,
	do_peso: String,
	do_talla: String,
	do_sil_not: Boolean,
	do_mod_sin_con: Boolean,
	do_token_dis: String,
    do_estado: String},
    {versionKey: false
});

module.exports = mongoose.model('donantes', DonanteSchema);
