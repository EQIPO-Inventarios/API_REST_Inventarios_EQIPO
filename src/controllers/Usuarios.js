const pool = require("../settings/db");
//Modelo BD
const {Usuario}  = require("../models/GestionUsuarios/Usuario");
const encryp = require("../middleware/encrypt")
const tokenValidator = require ("../middleware/tokenValidator")
const {Sucursales} = require("../models/GestionSucursales/Sucursales"); 

//GET
const listarUsuarios = async (req, res) =>{

  let model = await Usuario.find({estado : true})
    Usuario.countDocuments({}, (err, total ) =>{
      if (err) {
        return res.json({
          status:400,
          mensaje : "Error al leer el archivo",
          err

        })
      }
           
    })

    for (x in model) {
        //console.log(x.personal.idSucursal);
        await Sucursales.findById({_id : model[x].personal.idSucursal}, 
          (error, data)=>{
            if(error){

            }
            else{
              model[x].personal.idSucursal = data.Nombre;
            }
            //console.log(model[x].personal.idSucursal);
          })
    }
    res.json(model);

}

const buscar = async (req, res) =>{
  const id = req.params.id;
  await Usuario.findById(id)
  .exec()
  .then (x => { res.status(200).send(x) })
}


//POST
  let login = async(req, res)  =>{
    const   {usuario, password} = req.body;
    
    const model = await Usuario.findOne({usuario: usuario})
    if(model){  
        const idSucursal_model =model.personal.idSucursal
      const model2 = await Sucursales.findById({_id : idSucursal_model});  
      console.log(model2);
      if(encryp.comparePassword(String(password), model.password)){
        if(model.estado == true){
          res.status(200).json({           
              token : tokenValidator.generateToken(model.usuario),
              nivel : model.nivel.TipoNivel,
              Numeronivel : model.nivel.NumeroNivel,
              Nombre :  model.personal.Nombres +' '+ model.personal.Apellidos,
              NombreSucursal : model2.Nombre,
              CodigoSucursal : model2.Codigo,
              idSucursal : model2._id 
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
      password : encryp.encrypt(password), nivel : nivel}, (error, data)=>{
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

  module.exports ={listarUsuarios,login, crear, actualizar, eliminar, buscar}