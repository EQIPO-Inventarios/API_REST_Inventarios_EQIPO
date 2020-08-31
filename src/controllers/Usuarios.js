const express = require("express");

//conexion BD

const pool = require("../settings/db");
//Modelo BD
const Usuario  = require("../models/Usuario");
const { model } = require("../models/Usuario");


let listarUsuarios = async (req, res) =>{
    const model = await Usuario.find()
    Usuario.countDocuments({}, (err, total ) =>{
      if (err) {
        return res.json({
          status:400,
          mensaje : "Error al leer el archivo",
          err

        })
      }
      res.json( model) ;       
    })
  };


  let login = async(req, res)  =>{
    const   {user_name, password} = req.body;
    
    const objUser = new Usuario({
      user_name,
      password
    }) 
  
    const model = await Usuario.findOne({user_name: objUser.user_name, 
      password: objUser.password})
    if(model){
      res.json(model) //sustituir por validacion de token
    }else{
      res.json({
        status : 404,
        message : "Usuario no registrado"        
      })
    }
   

  }

  module.exports ={listarUsuarios,login}