'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Ubicacion = require('../models/ubicacion');

function getUbicaciones(req,res){
    var itemsPerPage = 7;

    if(req.query.page){
        var page = req.query.page;
    }else {
        var page = 1;
    }

    Ubicacion.find().populate({path: 'do_id'}).paginate(page, itemsPerPage, (err, ubicaciones, total )=> {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!ubicaciones){
                res.status(404).send({message: 'No hay ubicaciones'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    ubicaciones: ubicaciones
                });
            }
        }
    });
}


module.exports = {
    getUbicaciones
}
