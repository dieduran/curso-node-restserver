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
        emun :['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: String,
        default: false
    },
});

//podems sobreescribir los metodos de mongoose.
UsuarioSchema.methods.toJSON = function (){ //no de flecha porque necesito el this
    const {__v, password, ...usuario }= this.toObject();
    return usuario;

}


module.exports=model('Usuario',UsuarioSchema)
