'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Funcion = require('../models/funcion');

function getFuncion(req,res){
    var funcionId = req.params.fu_id;

    Funcion.findById(funcionId, (err, funcion)=> {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!funcion){
                res.status(404).send({message: 'La funcion no existe'});
            }else {
                res.status(200).send({funcion: funcion});
            }
        }
    });
}

function getFunciones(req,res){

    Funcion.find( (err, funciones)=> {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!funciones){
                res.status(404).send({message: 'No hay funciones'});
            }else{
                return res.status(200).send({
                    funciones: funciones
                });
            }
        }
    });
}

function getFuncionesByGrupo(req,res){
    var grupo = req.query.fu_grupo;

    Funcion.find({fu_grupo: grupo}, (err, funciones)=> {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!funciones){
                res.status(404).send({message: 'No hay funciones'});
            }else{
                return res.status(200).send({
                    funciones: funciones
                });
            }
        }
    });
}

function saveFuncion(req,res){
    var funcion = new Funcion();
    var params = req.body;
  
    funcion.fu_controller = params.fu_controller;
    funcion.fu_action = params.fu_action;
    funcion.fu_opcion = params.fu_opcion;
    funcion.fu_icono = params.fu_icono;
    funcion.fu_grupo = params.fu_grupo;
    funcion.fu_es_visible = params.fu_es_visible;
	
    funcion.save((err, funcionStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar la funcion'});
        }else{
            if(!funcionStored){
                res.status(404).send({message: 'La funcion no ha sido guardada'});
            }else{
                res.status(200).send({funcion: funcionStored});
            }
        }
    });
}


function updateFuncion(req,res){
    var funcionId = req.params.fu_id;
    var update = req.body;
    
    Funcion.findByIdAndUpdate(funcionId, update, (err, funcionUpdated)=> {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else {
            if(!funcionUpdated){
                res.status(404).send({message: 'No se ha actualizado la funcion'});
            }else {
                res.status(200).send({funcion: funcionUpdated});
            }
        }
    });
}

module.exports = {
    getFuncion,
    getFunciones,
    saveFuncion,
    updateFuncion,
    getFuncionesByGrupo
}
