//Conexion BD
const pool = require("../settings/db");
//Modelo BD
const {bodegaSchema} = require ('../models/GestionarBodegas/Bodegas');
const {Sucursales} = require('../models/GestionSucursales/Sucursales');

//POST
const crear = async(req, res)=>{
    const {id, NumeroBodega, Largo, Ancho, Estanterias} = req.body;
    const bodega = ({
        NumeroBodega,
        Estanterias,
        Largo,
        Ancho
    });

    let sucursal = await Sucursales.findOne({_id : id});
    
    if(sucursal){
        sucursal.Bodega.push(bodega);

        sucursal.save((error, data)=>{
            if(error){
                res.json({
                    mensaje : "Error al guardar la nueva bodega",
                    error
                });
            }else{
                res.status(200).json({
                    mensaje : "Bodega guardada exitosamente",
                    data
                });
            }
        });
    }else{
        res.json({
            status : 404,
            message : "Sucursal no encontrada"
        })
    }

    
    
}

const listar = async(req, res)=>{
    const _id = req.params;
    await Sucursales.findOne({_id : _id},(error, data)=>{
        if(error){
            res.json({
                mensaje : "Error al lista las bodegas",
                error
            });
        }else{
            if(data){
                res.status(200).json(
                    data.Bodega
                );
            }else{
                res.json({
                    mensaje : "Error no se ha encontrado la sucursal"
                })
            }
        }
    });

}

module.exports = {crear, listar};