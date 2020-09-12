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
   email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: value => {
         if (!validator.isEmail(value)) {
            throw new Error({error: 'Invalid Email address'})
         }
      }
   },
   password: {
      type: String,
      required: true,
      minLength: 7
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