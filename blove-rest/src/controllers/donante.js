'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var jwt = require("../services/jwt");
var Donacion = require('../models/donacion');
var Donante = require('../models/donante');

function getDonante(req,res){
    var donanteId = req.params.do_id;

    Donante.findById(donanteId, (err, donante)=> {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!donante){
                res.status(404).send({message: 'El donante no existe'});
            }else {
                res.status(200).send({donante});
            }
        }
    });
}

function getDonacionesByDonantes(req,res){
    var donanteId = req.params.do_id;

    Donacion.find({do_id: donanteId}).exec((err, donaciones)=> {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!donaciones){
                res.status(404).send({message: 'No existen donaciones'});
            }else {
                res.status(200).send({donaciones: donaciones});
            }
        }
    });
}

function silentNotification(req,res){
    var do_id = req.params.do_id;
    var silNot = req.query.do_sil_not;
    Donante.findByIdAndUpdate(do_id, {do_sil_not: silNot}, {new: true}, (err, donanteUpdated)=> {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else {
            if(!donanteUpdated){
                res.status(404).send({message: 'No se ha actualizado las preferencias'});
            }else {
                res.status(200).send({donante: donanteUpdated});
            }
        }
    });
}

function updateDonante(req,res){
    var do_id = req.params.do_id;
    var update = req.body;
    Donante.findByIdAndUpdate(do_id, update,{new: true}, (err, donanteUpdated)=> {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else {
            if(!donanteUpdated){
                res.status(404).send({message: 'No se ha actualizado el donante'});
            }else {
                res.status(200).send({donante: donanteUpdated});
            }
        }
    });
}

function getDonantes(req, res){
    if(req.params.page){
        var page = req.params.page;
    }else {
        var page = 1;
    }
    var itemsPerPage = 3;

    Donante.find().paginate(page, itemsPerPage, (err, donantes, total )=>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!donantes){
                res.status(404).send({message: 'No hay donantes'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    donantes: donantes
                });
            }
        }
    });
}

function saveDonante(req,res){
    var donante = new Donante();
    var params = req.body;
    donante.do_nombre = params.do_nombre;
    donante.do_apellido = params.do_apellido;
    donante.do_genero = params.do_genero;
	donante.do_fec_nac =  params.do_fec_nac;
	donante.do_correo = params.do_correo;
	donante.do_celular = params.do_celular;
	donante.do_tip_sang = params.do_tip_sang;
	donante.do_fec_ult_don = params.do_fec_ult_don;
	donante.do_puntos = params.do_puntos;
	donante.do_peso = params.do_peso;
	donante.do_talla = params.do_talla;
	donante.do_sil_not = params.do_sil_not;
	donante.do_mod_sin_con = params.do_mod_sin_con;
	donante.do_token_dis = params.do_token_dis;
	donante.do_estado = params.do_estado;
    donante.save((err, donanteStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar el donante'});
        }else{
            if(!donanteStored){
                res.status(404).send({message: 'El donante no ha sido guardado'});
            }else{
                res.status(200).send({donante: donante});
            }
        }
    });
}

function login(req, res){
    var do_celular = req.body.do_celular;

    if(do_celular){
    var query = { do_celular: do_celular };
       Donante.findOne(query, (err,donante) =>
       {
        if(err){
            //Error en el servidor
            res.status(500).send({message: 'Error en la petición'});
        }else {
            if(!donante){
                res.status(404).send({message: 'El usuario no existe',token: "",login: false});
            }else {
                res.status(200).send({
                    message: 'login exitoso',
                    token: jwt.createToken(donante),
                    login: true
                });
            }
        }
       });
      
    }else {
        res.status(404).send({message: 'No se ha ingresado un celular'});
    }
}

module.exports = {
    getDonacionesByDonantes,
    silentNotification,
    getDonante,
    updateDonante,
    getDonantes,
    saveDonante,
    login
}

