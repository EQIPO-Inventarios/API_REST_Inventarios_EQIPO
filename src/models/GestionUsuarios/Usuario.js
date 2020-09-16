const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
   nombre: {
      type: String,
      required: true,
      trim: true
  },
  apellido: {
    type: String,
    required: true,
    trim: true
  },
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
   },nivel : {
     type : mongoose.Schema.Types.ObjectId,
     ref : 'Niveles',
     require: true
   },
      token: {
         type: String,
         required: true
      },
      estado:{
         type : Boolean,
         required: true
      }
})


const User = mongoose.model('Usuarios', userSchema)

module.exports = User
