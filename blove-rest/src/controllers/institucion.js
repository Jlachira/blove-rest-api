'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Institucion = require('../models/institucion');
var CentroDonacion = require('../models/centro_donacion');

function getInstitucion(req,res){
    var institucionId = req.params.in_id;

    Institucion.findById(institucionId, (err, institucion)=> {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!institucion){
                res.status(404).send({message: 'La insitucion no existe'});
            }else {
                res.status(200).send({institucion: institucion});
            }
        }
    });
}

function getInstituciones(req, res){
   
    if(req.query.page){
        var page = req.query.page;
    }else {
        var page = 1;
    }
    var itemsPerPage = 7;
    Institucion.find().paginate(page, itemsPerPage, (err, instituciones, total )=>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!instituciones){
                res.status(404).send({message: 'No hay instituciones'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    instituciones: instituciones
                });
            }
        }
    });
}

function saveInstitucion(req,res){
    var institucion = new Institucion();
    var params = req.body;
    institucion.in_nombre = params.in_nombre;
	institucion.in_url_logo = params.in_url_logo;
	institucion.in_estado =  params.in_estado;
	
    institucion.save((err, institucionStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar la institucion'});
        }else{
            if(!institucionStored){
                res.status(404).send({message: 'La institucion no ha sido guardada'});
            }else{
                res.status(200).send({institucion: institucionStored});
            }
        }
    });
}

function updateInstitucion(req,res){
    var institucionId = req.params.in_id;
    var update = req.body;

    Institucion.findByIdAndUpdate(institucionId, update, (err, institucionUpdated)=> {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else {
            if(!institucionUpdated){
                res.status(404).send({message: 'No se ha actualizado la institucion'});
            }else {
                res.status(200).send({institucion: institucionUpdated});
            }
        }
    });
}

//Lista de centros de donacion que tiene una institucion
function getCentrosByInstitucion(req, res){
    var institucionId = req.params.in_id;
    var itemsPerPage = 7;
    var estado = req.query.cd_estado;
   
    if(!estado){
        //Lista todos los centros de donación de una institución
        var find = CentroDonacion.find({in_id: institucionId}).sort('cd_nombre');

    }else {
        //Lista todos los centros de donación de una institución por estado
        var find =  CentroDonacion.find({in_id: institucionId, cd_estado: estado }).sort('cd_nombre');
    }
    if(req.query.page){
        var page = req.query.page;
    }else {
        var page = 1;
    }

    find.paginate(page, itemsPerPage, (err, centros, total )=>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!centros){
                res.status(404).send({message: 'No hay centros de donacion asociadas a esa institucion'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    centros_donaciones: centros
                });
            }
        }
    });
}


module.exports = {
    getInstitucion,
    getInstituciones,
    saveInstitucion,
    updateInstitucion,
    getCentrosByInstitucion
}
