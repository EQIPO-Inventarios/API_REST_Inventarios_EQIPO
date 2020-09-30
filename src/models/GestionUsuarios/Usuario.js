const mongoose = require('mongoose')
const {nivelesSchema} = require("./Niveles");
const {personalSchema} = require('./Personal');

const userSchema = mongoose.Schema({
   personal : personalSchema,
  usuario: {
    type: String,
    required: true,
    trim: true,
    unique: true,
   },
   password: {
      type: String,
      required: true,
      minLength: 7
   },nivel : nivelesSchema,
   
   /**
    * Estado = 1 = usuario sin ingresar
    * Estado = 2 = usuario habilitado
    * Estado = 0 = usuario bloqueado
    */
   estado:{
      type : Number,
      required: true
   }
})


const Usuario = mongoose.model('Usuarios', userSchema)

module.exports = Usuario;
