'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var CentroDonacion = require('../models/centro_donacion');
var Campanias = require('../models/campania');
var Alertas = require('../models/alerta');
var Colaboradores = require('../models/colaborador');
var mongoose = require('mongoose');

function getCentroDonacion(req,res){
    var centroId = req.params.cd_id;
    CentroDonacion.findById(centroId, (err, centro)=> {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!centro){
                res.status(404).send({message: 'El centro de donacion no existe'});
            }else {
                res.status(200).send({centro_donacion: centro});
            }
        }
    });
}

function getCentrosDonaciones(req,res){
    var itemsPerPage = 7;

    if(req.query.page){
        var page = req.query.page;
    }else {
        var page = 1;
    }
CentroDonacion.find({cd_estado: 'A'}).paginate(page, itemsPerPage, (err, centros, total )=>{
    if(err){
        res.status(500).send({message: 'Error en la peticion'});
    }else {
        if(!centros){
            res.status(404).send({message: 'No hay centros'});
        }else{
            return res.status(200).send({
                total_items: total,
                centros: centros
            });
        }
    }
});
}

function saveCentroDonacion(req,res){
    var centroDonacion = new CentroDonacion();
    var params = req.body;
    centroDonacion.cd_nombre = params.cd_nombre;
    centroDonacion.cd_direccion = params.cd_direccion;
    centroDonacion.cd_ate_hor_ini = params.cd_ate_hor_ini;
    centroDonacion.cd_ate_hor_fin = params.cd_ate_hor_fin;
    centroDonacion.cd_latitud = params.cd_latitud;
    centroDonacion.cd_longitud = params.cd_longitud;
    centroDonacion.in_id = params.in_id;
	centroDonacion.cd_estado =  params.cd_estado;
	
    centroDonacion.save((err, centroDonacionStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar el centro de donación'});
        }else{
            if(!centroDonacionStored){
                res.status(404).send({message: 'El centro de donación no ha sido guardado'});
            }else{
                res.status(200).send({centro_donacion: centroDonacionStored});
            }
        }
    });
}


function updateCentroDonacion(req,res){
    var cd_id = req.params.cd_id;
    var update = req.body;
    
    CentroDonacion.findByIdAndUpdate(cd_id, update, (err, centroDonacionUpdated)=> {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else {
            if(!centroDonacionUpdated){
                res.status(404).send({message: 'No se ha actualizado el centro de donacion'});
            }else {
                res.status(200).send({centro_donacion: centroDonacionUpdated});
            }
        }
    });
}

function getCampaniasByCentros(req, res){
    var centroId = req.params.cd_id;
    var estadoCampania = req.query.ca_estado;
    var itemsPerPage = 7;

    if(req.query.page){
        var page = req.query.page;
    }else {
        var page = 1;
    }
  
    Campanias.find({cd_id: centroId, ca_estado: estadoCampania}).paginate(page, itemsPerPage, (err, campanias, total )=>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
           
            if(!campanias){
                res.status(404).send({message: 'No hay campañas'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    campanias: campanias
                });
            }
        }
    });
}

function getAlertasByCentros(req, res){
    var centroId = req.params.cd_id;
    var itemsPerPage = 7;
    var estado = req.query.al_estado;

    if(!estado){
        var find = Alertas.find({cd_id: centroId}).sort({al_fec_cre:-1});
    }else {
        
        var find =  Alertas.find({cd_id: centroId,  al_estado: {$ne:estado}}).sort({al_fec_cre:-1});
       
    }

    if(req.query.page){
        var page = req.query.page;
    }else {
        var page = 1;
    }
  
    find.populate({path:'co_id_cre'}).populate({path:'co_id_mod'}).paginate(page, itemsPerPage, (err, alertas, total )=>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!alertas){
                res.status(404).send({message: 'No hay alertas'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    alertas: alertas
                });
            }
        }
    });
}

function getColaboradoresByCentros(req, res){
    var centroId = req.params.cd_id;
    var itemsPerPage = 7;
    var estado = req.query.co_estado;

    if(!estado){
        var find = Colaboradores.find({cd_id: centroId}).sort('co_nombre');
    }else {
        
        var find =  Colaboradores.find({cd_id: centroId, co_estado: estado}).sort('co_nombre');
       
    }

    if(req.query.page){
        var page = req.query.page;
    }else {
        var page = 1;
    }
  
    find.paginate(page, itemsPerPage, (err, colaboradores, total )=>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!colaboradores){
                res.status(404).send({message: 'No hay colaboradores en dicho centro de donación'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    colaboradores: colaboradores
                });
            }
        }
    });
}

module.exports = {
    getCampaniasByCentros,
    getCentroDonacion,
    getCentrosDonaciones,
    saveCentroDonacion,
    updateCentroDonacion,
    getAlertasByCentros,
    getColaboradoresByCentros
}
