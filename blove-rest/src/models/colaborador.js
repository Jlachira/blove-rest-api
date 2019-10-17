'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ColaboradorSchema = Schema({
    co_nombre: String,
	co_apellido: String,
	co_correo: String,
	co_pass: String,
    co_estado: String,
    co_ver_user: String,
    co_img: String,
    ro_id: { type: Schema.ObjectId, ref: 'roles'},
    cd_id: { type: Schema.ObjectId, ref: 'centros_donaciones', null: true},
    in_id: { type: Schema.ObjectId, ref: 'instituciones', null: true}
    },
    {versionKey: false
});

module.exports = mongoose.model('colaboradores', ColaboradorSchema);