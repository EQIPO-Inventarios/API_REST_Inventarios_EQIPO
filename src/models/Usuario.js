const  {Schema, model} = require ("mongoose");


const Usuario = new Schema({    
    user_name :{type : String , require: [true, "Nombre de Usuario Obligatorio"]},
    password :{type : String , require: [true, "Contraseña  Obligatoria"]},
    name : {type : String , require: [true, "Nombre Obligatorio"]},
    lastname : {type : String , require: [true, "Apellido Obligatorio"]},
    createAt :{type : String , require: [true, "Fecha Obligatoria"]},
})

module.exports = model("usuarios", Usuario)