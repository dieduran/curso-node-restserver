//esto es porque si no no tengo ayuda contextual para res
const {request, response} = require('express') 

const usuariosGet= (req=request, res=response)=> {
    //res.send('Hello World')
    const {q,nombre='No name', apikey='Sin api'}= req.query;
    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey

    })
}

const usuariosPut = (req, res)=> {
    const id= req.params.id;
    res.json({
        msg: 'put API - controlador',
        id
    })
}

const usuariosPost= (req, res)=> {
    //const body=req.body;
    const {nombre, edad }= req.body;

    //res.status(201).json({
    res.json({
            msg: 'post API - controlador',
            nombre, edad
    })
}

const usuariosDelete=(req, res)=> {
    res.json({
        msg: 'delete API - controlador'
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