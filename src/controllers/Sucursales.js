//Conexion BD
const pool = require("../settings/db");
//Modelo BD
const {Sucursales} = require('../models/GestionSucursales/Sucursales');
const Direcciones = require("../models/GestionUsuarios/Direcciones");
const Contactos = require("../models/GestionUsuarios/Contactos");
const  bodega = require('../models/GestionarBodegas/Bodegas');

//POST
const crear = async(req, res) =>{
    const {Nombre, Codigo, Telefono, Correo, Departamento, Municipio,
    Descripcion, NumeroBodega, Largo, Ancho, Estanterias} = req.body;
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

    const bodega = ({
        NumeroBodega,
        Estanterias,
        Largo,
        Ancho
    })

    const sucursal = new Sucursales({
        Nombre,
        Codigo,
        Contacto,
        Bodega : bodega,
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
    await Sucursales.find({}, (error, data)=>{
        if(error){
            res.json({
                mensaje : "Erro al listar proveedores",
            });
        }else{
            res.status(200).json(
                data
            )
        }
    });
}

module.exports = {crear, listar};