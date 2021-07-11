const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario= require('../models/usuario');

const validarJWT = async (req = request, res = response, next )=>{

    const token = req.header('x-token') //es mi nombre de campo!

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try{
        //sacamos el uid del payload incluido en el JWT
        const {uid}= jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //leer el usuario qeu corresponde al uid
        const usuario= await Usuario.findById(uid);

        //verificamos si trajo resultados
        if(!usuario){
            return res.status(401).json({
                msg: 'Token no válido - usuario no existente'
            })
        }

        //Verificar si el uid esta activo estado = true
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no válido - usuario no activo'
            })
        }

        req.usuario= usuario; //creamos una propiedad nueva para pasar el dato
        next();

    }catch (error){

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })

    }
}

module.exports={
    validarJWT
}