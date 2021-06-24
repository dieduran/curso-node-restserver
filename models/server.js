const express = require('express')
const cors= require('cors');


class Server{
    constructor(){
        this.app = express()
        this.port= process.env.PORT;
        this.usuariosPath='/api/usuarios'; //para ver mas facil que apis

        //Middlewares: funcion que se ejecuta siempre
        this.middlewares();


        //Rutas de mi aplicacion
        this.routes();
    }

    //*******************
    //* metodos 

    middlewares(){
        //cors //control de origen
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json()); //cualquier informacion que venga la intenta pasar a json

        //directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.usuariosPath,require('../routes/usuarios'));
    }
    
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto',this.port )
        })
    }
}

module.exports= Server;
