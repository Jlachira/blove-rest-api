'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_blove';

//comprobar si los datos son correctos o no, del token que va a llevar
//next será para salir del middleware
exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'La petición no tiene la cabecera de autenticación'});
    }
    //quitar las comillas al token(simples o dobles)
    var token = req.headers.authorization.replace(/['"]+/g, '');

    //decodificar el token
    try{
        var payload = jwt.decode(token, secret);
        if(payload.exp <= moment().unix()){
            return res.status(401).send({message: 'El token ha expirado'});
        }
    }catch(ex){
        //console.log(ex);
        return res.status(404).send({message: 'El token no es válido'});
    }

    req.user = payload;
    next();
};