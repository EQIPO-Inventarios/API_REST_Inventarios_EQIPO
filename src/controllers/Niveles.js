const pool = require("../settings/db");
//Modelo BD
const Niveles  = require("../models/GestionUsuarios/Niveles");

//post
const crear = async (req, res) =>{
    const {Tipo, Numero} = req.body;
    const nivel = new Niveles({
        Tipo,
        Numero        
    });

    nivel.save((error, data)=>{
        if(error){
            return res.json({
                mensaje : "Error al agregar un nuevo Nivel",
                error
            });
        }else{
            return res.status(200).json({
                mensaje : "Nivel agregado exitosamente",
                data
            })
        }
    });   
}

//get
const eliminar = async (req, res) =>{
    const id = req.params;

    await Niveles.findOneAndUpdate({_id : id},{Estado : false}, (error, data)=>{
        if(error){
            res.json({
                mensaje : "Error al tratar de eliminar el nivel",
                error
            });
        }else{
            res.status(200).json({
                mensaje : "Nivel eliminado con exito",
                data
            });
        }
    });

}

//post
const actualizar = async (req,res) =>{

    const {id, Tipo, Numero} = req.body;

    Niveles.findOneAndUpdate({_id : id},
         {Tipo : Tipo,Numero : Numero}, (error, data)=>{

            if(error){
                res.json({
                    mensaje : "Error al tratar de actualizar el Nivel",
                    error
                });
            }else{
                res.status(200).json({
                    mensaje : "Nivel actualizado exitosamente",
                    data
                });
            }

    });


} 

//get
const listar = async (req, res) =>{
    await Niveles.find({Estado : true}, (error, data)=>{
        if (error) {
            res.json({
                mensaje : "Error al listar los Niveles",
                error
            });            
        } else {
            
            res.status(200).json(              
                data
            );
        }
    });
}

module.exports = {crear, eliminar, actualizar, listar}