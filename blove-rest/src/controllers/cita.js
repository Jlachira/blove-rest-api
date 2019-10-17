'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var mongoose = require('mongoose');

var Cita = require('../models/cita');

function getCitas(req, res){
    var do_id = mongoose.Types.ObjectId(req.params.do_id);
    if(req.params.page){
        var page = req.params.page;
    }else {
        var page = 1;
    }
    var itemsPerPage = 10;
    var query = { do_id: do_id };
    Cita.find(query).populate({path: 'citas.cd_id'}).paginate(page, itemsPerPage, (err, citas, total )=>{
        
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            
            if(!citas){
                res.status(404).send({message: 'No hay citas'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    citas: citas
                });
            }
        }
    });

}

function getCitasxFecha(req,res){
    var itemsPerPage = 7;
    var fecha = req.query.ci_fec_cre;

    if(req.query.page){
        var page = req.query.page;
    }else {
        var page = 1;
    }

    Cita.find({ci_fec_cre: fecha}).populate({path:'cd_id'}).populate({path:'do_id'}).paginate(page, itemsPerPage, (err, citas, total )=> {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!citas){
                res.status(404).send({message: 'No hay citas'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    citas: citas
                });
            }
        }
    });
}

function saveCita(req,res){
    var cita = new Cita();
    var params = req.body;
    cita.ci_fec_res = params.ci_fec_res;
    cita.ci_hor_res = params.ci_hor_res;
	cita.ci_fec_cre = params.ci_fec_cre;
	cita.cd_id =  params.cd_id;
	cita.do_id = params.do_id;
	cita.ci_estado = params.ci_estado;
    
    Cita.find({do_id: params.do_id}, (err, citas )=>{
        
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            
            if(citas.length==0){
                cita.save((err, citaStored) => {
                    if(err){
                        res.status(500).send({message: 'Error al guardar la cita'});
                    }else{
                        if(!citaStored){
                            res.status(404).send({message: 'La cita no ha sido guardada'});
                        }else{
                            res.status(200).send({message: 'La cita se ha guardado correctamente',cita: citaStored});
                        }
                    }
                });
            }else{
                res.status(404).send({message: 'Ya tiene una cita registrada'});
            }
        }});
    
    
}

function updateCita(req,res){
    var ci_id = req.params.ci_id;
    var update = req.body;
    Cita.findByIdAndUpdate(ci_id, update,{new: true}, (err, citaUpdated)=> {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else {
            if(!citaUpdated){
                res.status(404).send({message: 'No se ha actualizado la cita'});
            }else {
                res.status(200).send({message: 'La cita se ha actualizado correctamente',cita: citaUpdated});
            }
        }
    });
}

function deleteCita(req,res){
    var ci_id = req.params.ci_id;
    Cita.findByIdAndRemove(ci_id, (err, citaRemoved)=> {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else {
            if(!citaRemoved){
                res.status(404).send({message: 'No se ha eliminado la cita'});
            }else {
                res.status(200).send({message: 'La cita se ha eliminado correctamente',cita: citaRemoved});
            }
        }
    });
}


module.exports = {
    getCitas,
    updateCita,
    deleteCita,
    saveCita,
    getCitasxFecha
}
