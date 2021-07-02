const express = require('express')
const cors= require('cors');

const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.app = express()
        this.port= process.env.PORT;
        this.usuariosPath='/api/usuarios'; //para ver mas facil que apis


        //Conectar a base de datos
        this.conectarDB();

        //Middlewares: funcion que se ejecuta siempre
        this.middlewares();


        //Rutas de mi aplicacion
        this.routes();
    }

    //*******************
    //* metodos 

    async conectarDB(){
        await dbConnection();

    }


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
