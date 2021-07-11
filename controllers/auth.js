const {request, response} = require('express') ;
const bcriptjs= require('bcryptjs');

const Usuario= require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login= async(req=request, res= response)=>{

    const {correo,password} = req.body;
    try{
        //Verificar si el correo existe
        const usuario = await Usuario.findOne({correo});

        if (!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }
        //si el usuario esta activo
        if (!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        //verificar la contraseña
        const validPassword=  bcriptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        //generar el JWT  = Jason Web Token
        const  token= await generarJWT( usuario.id);

        res.json({
            usuario,
            token
        })

    } catch(error){
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

const googleSignin = async(req,res=response) =>{
    const {id_token}= req.body;
    try{
        //const googleUser= await googleVerify(id_token)
        const {nombre, correo, img}= await googleVerify(id_token)
        let usuario= await Usuario.findOne({correo});
        //van a funcionar las dos opciones..con usuario y con google
        //si no existe lo creamos
        if (!usuario) {
            const data={
                nombre,
                correo,
                password: ':P', //cualquier cosa porqeu es el de google
                img,
                google: true
            };
            usuario = new Usuario (data);
            await usuario.save (); //le damos el alta
        }
        
        //si el usuario existe en BD y tiene estado false (no permitido)
        if (!usuario.estado){
            return res.status(401).json({
                msg: 'Usuario bloqueado, hable con el administrador'
            })
        }
        //Generar el JWT
        const token= await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })

    }catch (error) {
        res.status(400).json({
            msg: 'Token de Google no es válido'
        });
    }
}

module.exports={
    login,
    googleSignin
}