'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CampaniaSchema = Schema({
    ca_nombre: String,
    ca_direccion: String,
    ca_latitud: String,
    ca_longitud: String,
    ca_descripcion: String,
    ca_img_url:String,
    ca_fec_ini:String,
    ca_fec_fin:String,
    ca_hor_ini:String,
    ca_hor_fin:String,
    ca_estado: String,
	co_id_cre: { type: Schema.ObjectId, ref: 'Colaborador', null: true},
    co_id_mod: { type: Schema.ObjectId, ref: 'Colaborador', null: true},
    cd_id: { type: Schema.ObjectId, ref: 'centros_donaciones'}
},
{versionKey: false
});
//el objeto va ser el que lleve la lista de todos las alertas del AlertasSchema
module.exports = mongoose.model('campanias', CampaniaSchema);
