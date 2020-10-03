const pool = require("../settings/db");
//Modelo BD
const {Usuario}  = require("../models/GestionUsuarios/Usuario");
const encryp = require("../middleware/encrypt")
const tokenValidator = require ("../middleware/tokenValidator")
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
    
    
    

    
    const model = await Usuario.findOne({usuario: usuario})
    if(model){  
      console.log(model)    
      if(encryp.comparePassword(String(password), model.password)){
        if(model.estado == true){
          res.status(200).json({           
              token : tokenValidator.generateToken(model.usuario),
              nivel : model.nivel.TipoNivel,
              Numeronivel : model.nivel.NumeroNivel,
              Nombre :  model.personal.Nombres +' '+ model.personal.Apellidos

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

//POST
const crear = async(req, res)=>{
  const {Nombres, Apellidos, Fecha_Nacimiento, DUI, NIT,
        Tipo, Numero, Departamento,
        Municipio, Descripcion, Correo, Telefono, idSucursal, NombreUsuario,
        Password, TipoNivel, NumeroNivel} = req.body;
  
  const Direccion = ({
    Departamento,
    Municipio,
    Descripcion
  })
  const Contacto = ({
    Direccion,
    Telefono,
    Correo
  })
  const Estado_Civil =({
    Tipo,
    Numero
  })
  const personal =({
    Nombres,
    Apellidos,
    Fecha_Nacimiento,
    DUI,
    NIT,
    Estado_Civil,
    Contacto,
    idSucursal
  })

  const nivel = ({
    TipoNivel,
    NumeroNivel
  })

  const usuarios = new Usuario({
    personal : personal,
    usuario : NombreUsuario,
    password : encryp.encrypt(Password),
    nivel : nivel,
    estado : true
  })

  const model = await Usuario.findOne({Usuario : NombreUsuario});
  if(model){
    res.json({
      status : 412,
      mensaje : "Nombre de usuario ya existente"
    });
  }else{
    usuarios.save((error, data)=>{
      if(error){
        return res.json({
          mensaje : "Error al agregar el nuevo usuario",
          error
        });
      }else{
        return res.status(200).json({
          mensaje : "Usuario agregado con exito",
          data
        });
      }
    });
  }
}

  module.exports ={listarUsuarios,login, crear}