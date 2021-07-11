
//esto es otra forma de exportar de a muchos
const validarCampos  = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jsw');
const validaRoles = require('../middlewares/validar-roles');

module.exports={
    ...validarCampos,
    ...validarJWT ,
    ...validaRoles
}