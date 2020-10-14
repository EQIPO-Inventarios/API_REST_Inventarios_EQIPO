//Conexion BD
const pool = require("../settings/db");
//Modelo BD
const {ubicacion_bodegaSchema} = require('../models/GestionarBodegas/UbicacionBodega');
const {bodegaSchema} = require('../models/GestionarBodegas/Bodegas');
const {Entradas} = require ('../models/GestionEntradas/Entradas');

//POST
const crear = async(req, res)=>{
    const {Fecha, Detalle, Cantidad, Monto, idProducto,
    idSucursal, NumeroBodega, Estanterias, Largo, Ancho,
    Estanteria, X, Y} = req.body;

    const Bodega = {
        NumeroBodega,
        Estanterias,
        Largo,
        Ancho
    }

    const Ubicacion_Bodega = {
        Bodega,
        Estanteria,
        X,
        Y
    }

    const entrada = new Entradas({
        Fecha,
        Detalle,
        idProducto,
        Cantidad,
        Monto,
        idSucursal,
        Ubicacion_Bodega
    })

    entrada.save((error, data) =>{
        if(error){
            res.json({
                mensaje : "Error al agregar la entrada",
                error
            });
        }else{
            return res.status(200).json({
                mensaje : "Entrada agregada exitosamente",
                data
            });
        }
    });
}



//GET
const listar = async(req, res) =>{
    await Entradas.find({}, (error, data) =>{
        if(error){
            res.json({
                mensaje : "Error al listar las entradas",
                error
            });
        }else{
            res.status(200).json(
                data
            );
        }
    });
}


module.exports = {crear, listar}