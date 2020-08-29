const express = require("express");

//conexion BD

const pool = require("../settings/db");
//Modelo BD
const Usuario  = require("../models/Usuario");
const { model } = require("../models/Usuario");


//app
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

  module.exports ={listarUsuarios}