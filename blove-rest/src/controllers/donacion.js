'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Donacion = require('../models/donacion');
var Donante = require('../models/donante');
var Alerta = require('../models/alerta');
function getDonacion(req,res){
    var donacionId = req.params.ds_id;

    Donacion.findById(donacionId).populate({path: 'do_id'}).exec((err, donacion)=> {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!donacion){
                res.status(404).send({message: 'La donación no existe'});
            }else {
                res.status(200).send({donacion: donacion});
            }
        }
    });
}

function saveDonacion(req,res){
    var donacion = new Donacion();
    var params = req.body;

    donacion.ds_estado = params.ds_estado;
    donacion.ds_fec_acep = params.ds_fec_acep;
    donacion.ds_fec_mue = params.ds_fec_mue;
    donacion.ds_fec_rea = params.ds_fec_rea;
    donacion.ds_puntos = params.ds_puntos;
    donacion.do_id = params.do_id;
    donacion.al_id = params.al_id;
	
    donacion.save((err, donacionStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar la donacion'});
        }else{
            if(!donacionStored){
                res.status(404).send({message: 'La donación no ha sido guardada'});
            }else{
                res.status(200).send({donacion: donacionStored});
            }
        }
    });
}

function getDonaciones(req, res){
    var ds_estado = req.query.ds_estado;
    var itemsPerPage = 7;

    if(!ds_estado){
        var find = Donacion.find().sort('ds_fec_acep');
    }else {
        var find =  Donacion.find({ds_estado: ds_estado}).sort('ds_fec_acep');
    }
    
    if(req.query.page){
        var page = req.query.page;
    }else {
        var page = 1;
    }

    find.paginate(page, itemsPerPage, (err, donaciones, total )=>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            
            if(!donaciones){
                res.status(404).send({message: 'No hay donaciones'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    donaciones: donaciones
                });
            }
        }
    });
}

function getExportExcel(req, res){

    Donacion.find().populate({path:'do_id'}).populate({path:'al_id'}).exec((err, donaciones)=>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            
            if(!donaciones){
                res.status(404).send({message: 'No hay donaciones'});
            }else{
                return res.status(200).send({
                    donaciones: donaciones
                });
            }
        }
    });
}

function updateDonacion(req,res){
    var donacionId = req.params.ds_id;
    var update = req.body;

    Donacion.findByIdAndUpdate(donacionId, update, (err, donacionIdUpdated)=> {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else {
            if(!donacionIdUpdated){
                res.status(404).send({message: 'No se ha actualizado la donación'});
            }else {
                actualizarPuntos(donacionIdUpdated,update);
                actualizarUnidReqAlertas(donacionIdUpdated,update);
                res.status(200).send({donacion: donacionIdUpdated});
            }
        }
    });
}

function actualizarPuntos(donacionIdUpdated,update){
        
        Donante.findById(update.do_id,function(err, donante){
            if (!donante)
                return next(new Error('No se encontró el donante'));
            else {
            // do your updates here
            if(donacionIdUpdated.ds_estado=="realizado" && update.ds_estado!= "realizado")
            {
                donante.do_puntos = donante.do_puntos -1;
            }
            else if(donacionIdUpdated.ds_estado!="realizado" && update.ds_estado=="realizado"){
                donante.do_puntos = donante.do_puntos +1;
            }
            donante.save(function(err) {
              if (err)
                console.log('Error en la actualizacion de puntos : '+err)
              else
                console.log('Puntos de donante actualizados')
            });
                }
        });
}

function actualizarUnidReqAlertas(donacionIdUpdated,update){
        
    Alerta.findById(update.al_id,function(err, alerta){
        if (!alerta)
            return next(new Error('No se encontró la alerta'));
        else {
        // do your updates here
        if(donacionIdUpdated.ds_estado=="realizado" && update.ds_estado!= "realizado")
        {
            alerta.al_uni_cons = alerta.al_uni_cons -1;
        }
        else if(donacionIdUpdated.ds_estado!="realizado" && update.ds_estado=="realizado"){
            alerta.al_uni_cons = alerta.al_uni_cons +1;
        }
        alerta.save(function(err) {
          if (err)
            console.log('Error en la actualizacion de unidades recolectadas : '+err)
          else
            console.log('Puntos de donante actualizados')
        });
            }
    });
}

module.exports = {
    getDonacion,
    getDonaciones,
    saveDonacion,
    updateDonacion,
    getExportExcel
}