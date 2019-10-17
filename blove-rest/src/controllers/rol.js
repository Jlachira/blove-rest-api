'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Rol = require('../models/rol');

function getRoles(req,res){
    var itemsPerPage = 7;

    if(req.query.page){
        var page = req.query.page;
    }else {
        var page = 1;
    }

    Rol.find().paginate(page, itemsPerPage, (err, roles, total )=> {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!roles){
                res.status(404).send({message: 'No hay roles'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    roles: roles
                });
            }
        }
    });
}

function saveRol(req,res){
    var rol = new Rol();
    var params = req.body;
    rol.ro_nombre = params.ro_nombre;
	
    rol.save((err, rolStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar el rol'});
        }else{
            if(!rolStored){
                res.status(404).send({message: 'El rol no ha sido guardado'});
            }else{
                res.status(200).send({rol: rolStored});
            }
        }
    });
}


function updateRol(req,res){
    var rolId = req.params.ro_id;
    var update = req.body;
    
    Rol.findByIdAndUpdate(rolId, update, (err, rolUpdated)=> {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else {
            if(!rolUpdated){
                res.status(404).send({message: 'No se ha actualizado el rol'});
            }else {
                res.status(200).send({rol: rolUpdated});
            }
        }
    });
}

module.exports = {
    getRoles,
    saveRol,
    updateRol
}
