'use strict'

var mongoosePaginate = require('mongoose-pagination');
var ColabFunciones = require('../models/colab_funciones');

function getColabFuncion(req,res){
    var colbfuncId = req.params.cf_id;

    ColabFunciones.findById(colbfuncId, (err, colbfunc)=> {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!colbfunc){
                res.status(404).send({message: 'El id ingresado de la funcion del colaborador no existe'});
            }else {
                res.status(200).send({colab_funcion: colbfunc});
            }
        }
    });
}

function getFuncionesByColab(req,res){
    var colabId = req.params.co_id;

    ColabFunciones.find({ co_id: colabId }).populate({path:'co_id'}).populate({path:'fu_id'}).exec((err, colab_funcion)=> {
  
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!colab_funcion){
                res.status(404).send({message: 'El colaborador no tiene funciones asignadas'});
            }else{
                return res.status(200).send({
                    colab_funcion: colab_funcion
                });
            }
        }
    });
}

function getColabFunciones(req,res){
    var itemsPerPage = 7;

    if(req.query.page){
        var page = req.query.page;
    }else {
        var page = 1;
    }

    ColabFunciones.find().paginate(page, itemsPerPage, (err, colbfunc, total )=> {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!colbfunc){
                res.status(404).send({message: 'No hay colaboradorades que tengan funciones '});
            }else{
                return res.status(200).send({
                    total_items: total,
                    colab_funciones: colbfunc
                });
            }
        }
    });
}

function saveColabFunciones(req,res){
    var colbfunc = new ColabFunciones();
    var params = req.body;
    colbfunc.cf_estado = params.cf_estado;
    colbfunc.co_id = params.co_id;
    colbfunc.fu_id = params.fu_id;
    
    ColabFunciones.findOne({ co_id: colbfunc.co_id, fu_id: colbfunc.fu_id  },(err, colbfuncion ) => {
        if(!colbfuncion){
            colbfunc.save((err, colbfuncStored) => {
                if(err){
                    res.status(500).send({message: 'Error al guardar la funcion del colaborador'});
                }else{
                    if(!colbfuncStored){
                        res.status(404).send({message: 'La funcion del colaborador no ha sido guardado'});
                    }else{
                        res.status(200).send({colab_funcion: colbfuncStored});
                    }
                }
            });
        }else {
            res.status(404).send({message: 'El colaborador ya tiene asignada esa funcion'});
        }
    });
}

function updateColabFunciones(req,res){
    var colbfuncId = req.params.cf_id;
    var update = req.body;
    
    ColabFunciones.findByIdAndUpdate(colbfuncId, update, (err, colbfuncUpdated)=> {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else {
            if(!colbfuncUpdated){
                res.status(404).send({message: 'No se ha actualizado la funcion del colaborador'});
            }else {
                res.status(200).send({colab_funcion: colbfuncUpdated});
            }
        }
    });
}

function deleteColabFunciones(req,res){
    var colbfuncId = req.params.cf_id;
    
    ColabFunciones.findByIdAndRemove(colbfuncId, (err, funcRemoved)=> {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else {
            if(!funcRemoved){
                res.status(404).send({message: 'No se ha eliminado la funcion del colaborador'});
            }else {
                res.status(200).send({message: 'La funcion del colaborador se ha eliminado correctamente',colab_funcion: funcRemoved});
            }
        }
    });
}


module.exports = {
    getColabFuncion,
    getColabFunciones,
    saveColabFunciones,
    updateColabFunciones,
    getFuncionesByColab,
    deleteColabFunciones
}