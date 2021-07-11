
const jwt = require('jsonwebtoken');

const generarJWT = (uid='')=>{
    //se have asi porque no esta con asyn await la libreria jwt
    return new Promise ((resolve,request)=>{

        const payload = {uid};

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err,token) =>{
            if(err){
                console.log('No se pudo genear el token')
            }else{
                resolve(token)
            }
        } )
    })
}

module.exports= {
    generarJWT
}