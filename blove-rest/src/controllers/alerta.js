'use strict'
var pushy = require('pushy-node');
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var api = new pushy('e963fbf68b63f9322644e46771956e640cc66408858a84aac0c71547c71674a0');
var Alerta = require('../models/alerta');
var Donacion = require('../models/donacion');
var Donante = require('../models/donante');

function getAlerta(req,res){
    var alertaId = req.params.al_id;

    Alerta.findById(alertaId, (err, alerta)=> {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!alerta){
                res.status(404).send({message: 'La alerta no existe'});
            }else {
                res.status(200).send({alerta: alerta});
            }
        }
    });
}

function saveAlertas(req,res){
    var alerta = new Alerta();
    var params = req.body;
    
    var hoy = new Date();
    var dia = hoy.getDate();
    var mes = hoy.getMonth()+1;
    var anio = hoy.getFullYear();
    var fecha_actual = dia + '/'+ mes+ '/'+ anio;

    alerta.al_nombre = params.al_nombre;
    alerta.al_descripcion = params.al_descripcion;
    alerta.al_estado = params.al_estado;
    alerta.al_tip_req = params.al_tip_req;
    alerta.al_tip_sang = params.al_tip_sang;
    alerta.al_rango = params.al_rango;
    alerta.al_uni_req = params.al_uni_req;
    alerta.al_uni_cons = params.al_uni_cons;
    alerta.al_fec_cre = fecha_actual;
    alerta.al_fec_mod =  params.al_fec_mod;
    alerta.co_id_cre = params.co_id_cre;
    alerta.co_id_mod =  params.co_id_mod;
    alerta.cd_id = params.cd_id;
	
    alerta.save((err, alertaStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar la alerta'});
        }else{
            if(!alertaStored){
                res.status(404).send({message: 'La alerta no ha sido guardado'});
            }else{
                res.status(200).send({alerta: alertaStored});
                console.log(alertaStored.cd_id.cd_nombre);
            }
        }
    });
    

    var data = {
        message: 'Se ha generado una alerta para donación'
    };
     // Set sample iOS notification fields
     var options = {
        notification: {
            badge: 1,
            sound: 'ping.aiff',
            body: 'Hello World \u270c'
        },
    };
   
    
    Donante.find({do_tip_sang: alerta.al_tip_sang, do_sil_not: false}, (err, donantes)=> {
        var devices = new Array();
        
        donantes.forEach(donante => {
            console.log('notificacion a: '+donante.do_celular)
            devices.push(donante.do_token_dis);
        });
        api.sendPushNotification(data, devices, options, function (err, id) {
            // Request failed?
            if (err) {
                console.log('error: Notificaciones no enviadas, '+err.message );
            }   
            console.log('success: message send successful');
    
        });
    });
   
    

}

function getAlertas(req, res){

    var itemsPerPage = 20;
    var al_estado = req.query.al_estado;

    if(!al_estado){
        var find = Alerta.find().populate({path: 'cd_id', select: 'cd_nombre cd_latitud cd_longitud'}).sort({al_fec_cre:-1});
    }else {
        var find =  Alerta.find({al_estado: al_estado}).populate({path: 'cd_id', select: 'cd_nombre cd_latitud cd_longitud'}).sort({al_fec_cre:-1});
    }
    if(req.query.page){
        var page = req.query.page;
    }else {
        var page = 1;
    }
    
    find.paginate(page, itemsPerPage, (err, alertas, total )=>{
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

function updateAlerta(req,res){
    var alertaId = req.params.al_id;
    var update = req.body;

    Alerta.findByIdAndUpdate(alertaId, update, (err, alertaUpdated)=> {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else {
            if(!alertaUpdated){
                res.status(404).send({message: 'No se ha actualizado la alerta'});
            }else {
                res.status(200).send({alerta: alertaUpdated});
            }
        }
    });
}

//Lista de donaciones que tiene una alerta
function getDonacionesByAlertas(req, res){
    var alertaId = req.params.al_id;
    var itemsPerPage = 7;
    var estado = req.query.ds_estado;
    if(!estado){
        //Lista todos las donaciones de una alerta
        var find = Donacion.find({al_id: alertaId}).sort('ds_fec_acep');

    }else {
        //Lista todos las donaciones de una alerta por estado
        var find =  Donacion.find({al_id: alertaId, ds_estado: estado }).sort('ds_fec_acep');
    }
    if(req.query.page){
        var page = req.query.page;
    }else {
        var page = 1;
    }

    find.populate({path: 'do_id'}).paginate(page, itemsPerPage, (err, donaciones, total )=>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!donaciones){
                res.status(404).send({message: 'No hay donaciones asociadas a esa alerta'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    donaciones: donaciones
                });
            }
        }
    });
}

module.exports = {
    getAlerta,
    getAlertas,
    saveAlertas,
    updateAlerta,
    getDonacionesByAlertas
}
