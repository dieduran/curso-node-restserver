//esto es porque si no no tengo ayuda contextual para res
const {request, response} = require('express') ;
const bcriptjs= require('bcryptjs');

const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');

const usuariosGet= async (req=request, res=response)=> {
    const {limite=5, desde=0}= req.query;
    const query={estado: true};

    //Todos los usuarios
    // const usuarios= await Usuario.find();
    //los dos primeros: .limit(2)}
    // {estado: true} => filtro de condicion

    /*
    const usuarios= await Usuario.find(query)
                .skip(Number(desde))
                .limit(Number(limite)); 
    
    const total= await Usuario.countDocuments(query);
    */

    //ejecutamos en paralelo y terminan cuando termina la ultima
    //si una da error dan todas error
    const [total, usuarios]= await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })
}

const usuariosPut = async(req, res)=> {
    const {id}= req.params;
    const {_id, password, google, ...resto} = req.body;

    //TODO validar contra base de datos
    if(password){
        // encriptar la contraseña
        const salt= bcriptjs.genSaltSync();//cantidad de vueltas de encriptado: defecto 10
        resto.password= bcriptjs.hashSync(password, salt)        
    }

    const usuario= await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}


const usuariosPost= async (req, res)=> {
    
    const {nombre, correo, password, rol}=req.body;
    const usuario = new Usuario({nombre, correo, password, rol}); //para que no me pasen datos por eje google que no deberian decidirlo

    // //verificar que no exista el correo

    //ahora esta como custom validation en db-validators y la uso en routes
    // const existeEmail= await Usuario.findOne({correo});
    // if (existeEmail){
    //     //ya existe.. da error porque no puede haber dos
    //     return res.status(400).json({
    //         "msg":"Ese correo ya está registrado."
    //     })
    // }

    // encriptar la contraseña
    const salt= bcriptjs.genSaltSync();//cantidad de vueltas de encriptado: defecto 10
    usuario.password= bcriptjs.hashSync(password, salt)

    //guardar en BD
    await usuario.save(); //grabo en mongo
    
    res.json({
            usuario
    })
}

const usuariosDelete= async(req, res)=> {
    const {id} = req.params;

    const usuarioAutenticado= req.usuario;  //viene del validarJWT
    // //OJO: Esto lo borra fisicamente
    // const usuario= await Usuario.findByIdAndDelete(id);

    //esto lo marca como eliminado
    const usuario= await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        usuario
    })
}
const usuariosPatch=(req, res)=> {
    res.json({
        msg: 'patch API - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}