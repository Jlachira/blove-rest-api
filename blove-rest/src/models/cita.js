'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var CitaSchema = Schema({
	ci_fec_res: String,
	ci_hor_res: String,
	ci_fec_cre: String,
	do_id: { type: Schema.ObjectId, ref: 'donantes'},
	cd_id: { type: Schema.ObjectId, ref: 'centros_donaciones'},
	ci_estado: String},
    {versionKey: false
});

module.exports = mongoose.model('citas', CitaSchema);