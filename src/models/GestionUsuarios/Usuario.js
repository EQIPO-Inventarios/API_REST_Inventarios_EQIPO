const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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
   token: {
      type: String,
      required: true
   },
   estado:{
      type : Boolean,
      required: true
   }
})


const Usuario = mongoose.model('Usuarios', userSchema)

module.exports = Usuario;
