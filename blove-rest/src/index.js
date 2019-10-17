'use strict'
//CONEXIÓN A MONGO DB REALIZADA!
var mongoose = require('mongoose');
//ejecutamos el fichero de javascript quien va a tener a express, 
//todas las rutas de carga central
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.Promise = global.Promise;
var uri = "mongodb+srv://adminblove:marmoteando123@cluster0-7bgpj.mongodb.net/blovebd?retryWrites=true&w=majority";
mongoose.connect(uri, (err, res)=> {
    if(err){
        throw err;
    }else {
        console.log("La conexión a la base de datos está funcionando correctamente");
        app.listen(port, function(){
            console.log("Servidor del API REST de Blove está escuchando en http://localhost:"+port);
        });

    }
});