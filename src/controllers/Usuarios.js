const pool = require("../settings/db");
//Modelo BD
const Usuario  = require("../models/GestionUsuarios/Usuario");


const listarUsuarios = async (req, res) =>{
    const model = await Usuario.find()
    Usuario.countDocuments({}, (err, total ) =>{
      if (err) {
        return res.json({
          status:400,
          mensaje : "Error al leer el archivo",
          err

        })
      }
      res.json(model);       
    });
}

//POST
  let login = async(req, res)  =>{
    const   {usuario, password} = req.body;
    
    const objUser = new Usuario({
      usuario,
      password
    })   
    const model = await Usuario.findOne({usuario: objUser.usuario})
    if(model){      
      if(model.password == password){
        if(model.estado == true){
          res.status(200).json({           
            token : model.token        
          })
        }else{
          res.json({
            status : 204,
            message : "Usuario no registrado"        
          })
        }
      }else{
        res.json({
          status : 204,
          message : "Usuario o contraseña incorrectos"        
        })
      }
    }else{
      res.json({
        status : 204,
        message : "Usuario no registrado"        
      })
    }
   

  }

  module.exports ={listarUsuarios,login}