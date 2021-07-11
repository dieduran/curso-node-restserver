const {Schema, model}= require('mongoose')

const UsuarioSchema= Schema({
    nombre: {
        type: String,
        required: [true,'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true,'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'La contraseña es obligatoria']
    },
    imagen: {
        type: String
    },
    rol: {
        type: String,
        required: [true,'La contraseña es obligatoria'],
        default: 'USER_ROLE',
        emun :['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

//podemos sobreescribir los metodos de mongoose.
UsuarioSchema.methods.toJSON = function (){ //no de flecha porque necesito el this
    const {__v, password, _id, ...usuario }= this.toObject();
    usuario.uid=_id; //con esto utilizo uid para mostrar siempre en lugar de _id
    return usuario;

}


module.exports=model('Usuario',UsuarioSchema)
