'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var InstitucionSchema = Schema({
    in_nombre: String,
	in_url_logo: String,
	in_estado: String    
    },
    {versionKey: false
});

module.exports = mongoose.model('instituciones', InstitucionSchema);