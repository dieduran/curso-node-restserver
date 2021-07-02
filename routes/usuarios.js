const {Router} = require('express');
const {check} = require('express-validator')

const { esRoleValido, emailExiste, existeUsuarioPorID } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers/usuarios');

const router= Router();

router.get('/',  usuariosGet ); //no ejecuto usuariosGet..mando referencia

router.put('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioPorID),
        check('rol').custom(esRoleValido),
        validarCampos
        ],usuariosPut);

router.post('/',[ 
        check('nombre','El nombre es obligatorio').not().isEmpty(), //no vacio
        check('password','El nombre es obligatorio y con más de seis letras').isLength({min:6}).not().isEmpty(), //no vacio
        check('correo','El correo no es válido').isEmail(),
        check('correo').custom(emailExiste),
        //cuando son fijos...
        //check('rol','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
        //cuando veo contra otra tabla
        //check('rol').custom((rol)=> esRoleValido(rol) ), //es lo mismo que..
        check('rol').custom(esRoleValido),
        validarCampos
        ], usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioPorID),
        validarCampos
        ],usuariosDelete);

module.exports= router;




