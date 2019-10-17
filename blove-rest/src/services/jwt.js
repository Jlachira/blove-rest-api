'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_blove';

exports.createToken = function(donante){
    var payload = {
        id: donante._id,
        do_nombre: donante.do_nombre,
        do_apellido: donante.do_apellido,
        do_fec_nac: donante.do_fec_nac,
        do_correo: donante.do_correo,
        do_celular: donante.do_celular,
        do_tip_sang: donante.do_tip_sang,
        do_fec_ult_don: donante.do_fec_ult_don,
        do_puntos: donante.do_puntos,
        do_peso: donante.do_peso,
        do_talla: donante.do_talla,
        do_sil_not: donante.do_sil_not,
        do_mod_sin_con: donante.do_mod_sin_con,
        do_token_dis: donante.do_token_dis,
        do_estado: donante.do_estado,
        iat: moment().unix(),
        exp: moment().add(30, 'minutes').unix
    };
    //codificamos los datos
    return jwt.encode(payload, secret);
};

exports.createTokenColab = function(colaborador){
    var payload = {
        id: colaborador._id,
        co_nombre: colaborador.co_nombre,
	    co_apellido: colaborador.co_apellido,
	    co_correo: colaborador.co_correo,
	    co_pass: colaborador.co_pass,
        co_estado: colaborador.co_estado,
        co_ver_user: colaborador.co_ver_user,
        co_img: colaborador.co_img,
        ro_id: colaborador.ro_id,
        cd_id: colaborador.cd_id,
        in_id: colaborador.in_id,
        iat: moment().unix(),
        exp: moment().add(30, 'minutes').unix
    };
    //codificamos los datos
    return jwt.encode(payload, secret);
};

