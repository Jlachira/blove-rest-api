'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlertaSchema = Schema({
    al_nombre: String,
    al_descripcion: String,
    al_estado: String,
    al_tip_req: String,
	al_tip_sang: String,
	al_uni_req: Number,
    al_uni_cons: Number,
    al_rango: Number,
	al_fec_cre: String,
	al_fec_mod: String,
	co_id_cre: { type: Schema.ObjectId, ref: 'colaboradores'},
    co_id_mod: { type: Schema.ObjectId, ref: 'colaboradores'},
    cd_id:{ type: Schema.ObjectId, ref: 'centros_donaciones'}
},
{versionKey: false
});
//el objeto va ser el que lleve la lista de todos las alertas del AlertasSchema
module.exports = mongoose.model('alertas', AlertaSchema);

