const {validationResult} = require('express-validator')

const validarCampos=(req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){ //si hay mensajes de error en la validacion
        return res.status(400).json(errors);
    }


    //si llego a este punto sigue con el siguiente...
    next();
}

module.exports={
    validarCampos
}