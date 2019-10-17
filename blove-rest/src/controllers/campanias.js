'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Campanias = require('../models/campania');

//Se requiere dos listar
//Listar todas las campañas de una institución

function getCampania(req,res){
    var campaniaId = req.params.ca_id;

    Campanias.findById(campaniaId, (err, campania)=> {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!campania){
                res.status(404).send({message: 'La campaña no existe'});
            }else {
                res.status(200).send({campania: campania});
            }
        }
    });
}

function getCampanias(req, res){

    var itemsPerPage = 20;
    var ca_estado = req.query.ca_estado;
    
    if(!ca_estado){
        var find = Campanias.find().sort('ca_nombre');
    }else {
        
        var find =  Campanias.find({ca_estado: ca_estado}).sort('ca_nombre');
       
    }
    if(req.query.page){
        var page = req.query.page;
    }else {
        var page = 1;
    }
    
    find.paginate(page, itemsPerPage, (err, campanias, total )=>{
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


function saveCampania(req,res){
    var campania = new Campanias();
    var params = req.body;
    campania.ca_nombre = params.ca_nombre;
    campania.ca_direccion = params.ca_direccion;
    campania.ca_latitud = params.ca_latitud;
    campania.ca_longitud = params.ca_longitud;
    campania.ca_descripcion = params.ca_descripcion;
    campania.ca_img_url = params.ca_img_url;
    campania.ca_fec_ini = params.ca_fec_ini;
    campania.ca_fec_fin = params.ca_fec_fin;
    campania.ca_hor_ini = params.ca_hor_ini;
    campania.ca_hor_fin = params.ca_hor_fin;
    campania.ca_estado = params.ca_estado;
    if(!params.co_id_mod){
        campania.co_id_mod = null;
    }else {
        campania.co_id_mod = params.co_id_mod;
    }
	campania.co_id_cre = params.co_id_cre;
    campania.cd_id = params.cd_id;
   
    campania.save((err, campaniaStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar la campaña'});
        }else{
            if(!campaniaStored){
                res.status(404).send({message: 'La campaña no ha sido guardado'});
            }else{
                res.status(200).send({campania: campaniaStored});
            }
        }
    });
}

function updateCampania(req,res){
    var campaniaId = req.params.ca_id;
    var update = req.body;

    Campanias.findByIdAndUpdate(campaniaId, update, (err, campaniaUpdated)=> {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else {
            if(!campaniaUpdated){
                res.status(404).send({message: 'No se ha actualizado la campaña'});
            }else {
                res.status(200).send({campania: campaniaUpdated});
            }
        }
    });
}

module.exports = {
    getCampania,
    getCampanias,
    saveCampania,
    updateCampania
}
