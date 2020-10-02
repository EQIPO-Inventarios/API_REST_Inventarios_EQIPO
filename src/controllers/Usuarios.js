const pool = require("../settings/db");
//Modelo BD
const {Usuario}  = require("../models/GestionUsuarios/Usuario");
const {contactoSchema} = require("../models/GestionUsuarios/Contactos");
const {direccionesSchema} = require("../models/GestionUsuarios/Direcciones");
const {estadosCivilesSchema} = require("../models/GestionUsuarios/Estados_Civiles");
const {personalSchema} = require("../models/GestionUsuarios/Personal");
const {nivelesSchema} = require("../models/GestionUsuarios/Niveles");
const Sucursales = require("../models/GestionSucursales/Sucursales");

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
        Municipio, Descripcion, Correo, Telefono, idSucursal, usuario,
        password, TipoNivel, NumeroNivel} = req.body;
  
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
    personal,
    usuario,
    password,
    nivel
  })

  const model = await Usuario.findOne({Usuario : usuario});
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

//PUT
const actualizar = async(req, res)=>{
  const {Nombres, Apellidos, Fecha_Nacimiento, DUI, NIT,
        Tipo, Numero, Departamento,
        Municipio, Descripcion, Correo, Telefono, idSucursal, usuario,
        password, TipoNivel, NumeroNivel, id} = req.body;

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

    Usuario.findOneAndUpdate({_id : id},
      {personal : personal, usuario : usuario,
      password : password, nivel : nivel}, (error, data)=>{
        if(error){
          res.json({
            mensaje : "Error al actualizar datos de usuario",
            error
          });
        }else{
          res.status(200).json({
            mensaje : "Datos de usuario actualizados exitosamente",
            data
          });
        }
    });
}

//DELETE
const eliminar = async(req, res)=>{
  const id = req.params;

  await Usuario.findOneAndUpdate({_id : id},
    {estado : false}, (error, data)=>{
      if(error){
        res.json({
          mensaje : "Error al tratar de dar baja a usuario",
          error
        });
      }else{
        res.status(200).json({
          mensaje : "Usuario dado de baja exitosamente",
          data
        });
      }
    });
}

  module.exports ={listarUsuarios,login, crear, actualizar, eliminar}