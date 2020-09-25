//Conexion BD
const pool = require("../settings/db");
//Modelo BD
const {Sucursales} = require('../models/GestionSucursales/Sucursales');
const Direcciones = require("../models/GestionUsuarios/Direcciones");
const Contactos = require("../models/GestionUsuarios/Contactos");
const {Bodegas} = require('../models/GestionarBodegas/Bodegas');
const bodegas = require('../models/GestionSucursales/Sucursales');


//POST
const crear = async(req, res) =>{
    const {Nombre, Codigo, Telefono, Correo, Departamento, Municipio,
    Descripcion, Largo, Ancho, Estanterias} = req.body;
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
    //-------------------------------------------
    //Modelo para Bodega
    const Sucursal = ({
        Nombre,
        Codigo,
        Contacto
    })

    const bodega = new Bodegas({
        Sucursal,
        Estanterias,
        Largo,
        Ancho
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
                /*return res.status(200).json({
                    mensaje : "Sucursal agregada exitosamente",
                    data
                });*/

                bodega.save((error, data)=>{
                    if(error){
                        return res.json({
                            mensaje : "Error al agregar la bodega",
                            error
                        });
                    }else{
                        return res.status(200).json({
                            mensaje : "Sucursal y Bodega agregada exitosamente",
                            data
                        });
                    }
                });
            }
        });
    }
}

module.exports = {crear};