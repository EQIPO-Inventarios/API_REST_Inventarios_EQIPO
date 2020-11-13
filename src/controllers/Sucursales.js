//Conexion BD
const pool = require("../settings/db");
//Modelo BD
const {Sucursales} = require('../models/GestionSucursales/Sucursales');
const Direcciones = require("../models/GestionUsuarios/Direcciones");
const Contactos = require("../models/GestionUsuarios/Contactos");
const Proveedores = require("../models/GestionProveedores/Proveedores");

//POST
const crear = async(req, res) =>{
    const {Nombre, Codigo, Telefono, Correo, Departamento, Municipio,
    Descripcion} = req.body;
    //Modelo para Sucursal
    const Direccion = ({
        Departamento,
        Municipio,
        Descripcion
    })

    const Contacto = ( {
        Direccion,
        Telefono,
        Correo
    })

    const sucursal = new Sucursales({
        Nombre,
        Codigo,
        Contacto
    });

    const model = await Sucursales.findOne({Nombre : sucursal.Nombre});
    if(model){
        res.json({
            status : 412,
            message : "Nombre de sucursal ya existente"
        });
    }else{
        sucursal.save((error, data) =>{
            if(error){
                return res.json({
                    mensaje : "Error al agregar una nueva sucursal",
                    error
                });
            }else{
                return res.status(200).json({
                    mensaje : "Sucursal y bodega agregada exitosamente",
                    data
                });
            }
        });
    }
}

//GET
const listar = async(req, res)=>{
    await Sucursales.find({Estado : true}, (error, data)=>{
        if(error){
            res.json({
                mensaje : "Error al listar sucursales",
            });
        }else{
            res.status(200).json(
                data
            )
        }
    });
}

//PUT
const actualizar = async(req, res)=>{
    
    const{id, Nombre, Codigo, Correo, Telefono,
    Departamento, Municipio, Descripcion} = req.body;

    const Direccion = ({
        Departamento,
        Municipio,
        Descripcion
    })
    const Contacto =({
        Direccion,
        Telefono,
        Correo
    })
    
    Sucursales.findOneAndUpdate({_id : id},
        {Nombre : Nombre, Codigo : Codigo, Contacto : Contacto},
        (error, data)=>{
            if(error){
                res.json({
                    mensaje : "Error al actualizar datos de sucursal",
                    error
                });
            }else{
                res.status(200).json({
                    mensaje : "Datos de sucursal actualizada exitosamente",
                    data
                });
            }
        });
}

//DELETE
const eliminar = async(req, res)=>{
    const id = req.params;

    await Sucursales.findOneAndUpdate({_id : id},
        {Estado : false}, (error, data)=>{
            if(error){
                res.json({
                    mensaje : "Error al tratar de dar de baja a sucursal",
                    error
                });
            }else{
                res.status(200).json({
                    mensaje : "Sucursal dado de baja exitosamente",
                    data
                });
            }
        });
}

//GET
const listarPorNombre = async(req, res)=>{
    let regex = new RegExp(req.params.Nombre, "i")
    await Sucursales.find({Nombre : regex, Estado : true}, (error, data)=>{
        if(error){
            res.json({
                mensaje : "Error al listar sucursales",
                error
            })
        }else{
            res.status(200).json(
                data
            )
        }
    });
}


module.exports = {crear, listar, actualizar, eliminar, listarPorNombre};