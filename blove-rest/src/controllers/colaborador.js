'use strict'

var mongoosePaginate = require('mongoose-pagination');
var jwt = require("../services/jwt");
var bcrypt = require('bcrypt-nodejs');
var Colaborador = require('../models/colaborador');
var Colab_Funciones = require('../models/colab_funciones');

function getColaborador(req,res){
    var colabId = req.params.co_id;

    Colaborador.findById(colabId, (err, colab)=> {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!colab){
                res.status(404).send({message: 'El colaborador no existe'});
            }else {
                res.status(200).send({colaborador: colab});
            }
        }
    });
}

function getColaboradores(req, res){
    var centrosId = req.params.cd_id;
    var itemsPerPage = 7;
    var estado = req.query.co_estado;
    if(!estado){
        //Lista todos los centros de donación de una institución
        var find = Colaborador.find({cd_id: centrosId}).sort('co_nombre');

    }else {
        //Lista todos los centros de donación de una institución por estado
        var find =  Colaborador.find({cd_id: centrosId, co_estado: estado }).sort('co_nombre');
    }
    if(req.query.page){
        var page = req.query.page;
    }else {
        var page = 1;
    }
    
    find.paginate(page, itemsPerPage, (err, colaborador, total )=>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!colaborador){
                res.status(404).send({message: 'No hay colaboradores'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    colaboradores: colaborador
                });
            }
        }
    });
}

function saveColaborador(req,res){
    var colaborador = new Colaborador();
    var params = req.body;
    colaborador.co_nombre = params.co_nombre;
	colaborador.co_apellido = params.co_apellido;
	colaborador.co_correo = params.co_correo ;
	colaborador.co_pass = params.co_pass;
    colaborador.co_estado = params.co_estado;
    colaborador.co_ver_user = params.co_ver_user;
    colaborador.co_img = "https://www.uic.mx/posgrados/files/2018/05/default-user.png";
    if(!params.cd_id){
        colaborador.cd_id = null;
        colaborador.ro_id = "5d6be9371c9d4400007a6ce6";
    }else {
        colaborador.cd_id = params.cd_id;
        colaborador.ro_id = "5d6be9e01c9d4400007a6cea";
    }
    if(!params.in_id){
        colaborador.in_id = null;
    }else {
        colaborador.in_id = params.in_id;
    }

    if(params.co_pass){
        //Encriptar contraseña y guardar dato
        bcrypt.hash(params.co_pass, null, null, function(err, hash){
            colaborador.co_pass = hash;
            if(colaborador.co_nombre!= null && colaborador.co_apellido!= null && colaborador.co_correo!= null && colaborador.co_estado!= null && colaborador.ro_id !=null){
                //Guardar el usuario
                //funcion de callback de tipo flecha
                colaborador.save((err, colaboradorStore)=> {
                    if(err){
                        res.status(500).send({message: 'Error al guardar el colaborador'});
                    }else {
                        if(!colaboradorStore){
                            res.status(404).send({message: 'No se ha registrado el colaborador'});
                        }else {
                            res.status(200).send({colaborador: colaboradorStore});
                        }
                    }
                });
            }else {
                res.status(200).send({message: 'Rellena todos los campos'});
            }
        });
    }else {
        res.status(200).send({message: 'Introduce la contraseña'});
    }
}

function recuperarContrasena(req, res){
    var correo = req.query.co_correo;

    Colaborador.findOne({co_correo: correo}, (err, colab)=> {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!colab){
                res.status(404).send({message: 'El colaborador no existe'});
            }else {
                res.status(200).send({co_pass: colab.co_pass});
            }
        }
    });
}

function makeid() { 
    var text = ""; 
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; 
    for (var i = 0; i < 9; i++) 
        text += possible.charAt(Math.floor(Math.random() * possible.length)); 
    
    return text; 
} 

function updateContrasena(req,res){
    var correo = req.body.co_correo;
    
    Colaborador.findOne({co_correo: correo}, (err, colab)=> {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else {
            if(!colab){
                res.status(404).send({message: 'El colaborador no existe'});
            }else {
                var nuevaContrasena = makeid();
                bcrypt.hash(nuevaContrasena, null, null, (err, hash)=>{
                
                Colaborador.findByIdAndUpdate(colab._id, {co_pass: hash}, (err, colabUpdated)=> {
                    if(err){
                        res.status(500).send({message: 'Error en el servidor'});
                    }else {
                        if(!colabUpdated){
                            res.status(404).send({message: 'No se ha actualizado el colaborador'});
                        }else {
                            res.status(200).send({co_pass: nuevaContrasena});
                        }
                    }
                });
                });
            }
        }
    });
}

function updateColaboradores(req,res){
    var colabId = req.params.co_id;
    var update = req.body;
    
    Colaborador.findByIdAndUpdate(colabId, update, (err, colabUpdated)=> {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else {
            if(!colabUpdated){
                res.status(404).send({message: 'No se ha actualizado el colaborador'});
            }else {
                res.status(200).send({colaborador: colabUpdated});
            }
        }
    });
}

function modificarEstadoColab(colabId){
    Colaborador.findByIdAndUpdate(colabId, {co_estado: 'A'}, (err, colabUpdated)=> {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else {
            if(!colabUpdated){
                res.status(404).send({message: 'No se ha actualizado el estado del colaborador'});
            }
        }
    });
}
function loginColaborador(req, res){
    var params= req.body;

    var email = params.co_correo;
    var password = params.co_pass;
    var cod_verificacion = params.co_ver_user;

    //(err,user) un callback de error
    Colaborador.findOne({co_correo: email.toLowerCase()}, (err, colaborador)=> {
        if(err){
            //Error en el servidor
            res.status(500).send({message: 'Error en la petición'});
        }else {
            if(!colaborador){
                res.status(404).send({message: 'El colaborador no existe'});
            }else {
                //Comprobar la contraseña
                bcrypt.compare(password, colaborador.co_pass, (err, check)=> {
                    if(err){
                        //Error en el servidor
                        res.status(500).send({message: 'Error en la peticion con la contraseña'});
                    }else {
                        if(check){
                            if(colaborador.co_estado == 'A' || (colaborador.co_estado == 'P' && colaborador.co_ver_user == cod_verificacion)){
                            //devolver los datos del usuario logeado
                            //debo de haber colocalo como parámetro el gethash = true
                            modificarEstadoColab(colaborador._id);   
                                if(params.gethash){
                                    //devolver el token de jwt
                                    res.status(200).send({
                                        token: jwt.createTokenColab(colaborador)
                                    });
                                }else {
                                    res.status(200).send({colaborador});
                                }
                            }else {
                                res.status(404).send({message: 'El colaborador está dado de baja'});
                            }
                        }else{
                            res.status(404).send({message: 'El colaborador no ha posido loguearse'});
                        }
                    }
                });
            }
        }
    });
}


module.exports = {
    getColaborador,
    getColaboradores,
    saveColaborador,
    updateColaboradores,
    recuperarContrasena,
    loginColaborador,
    updateContrasena
}