//Conexion BD
const pool = require("../settings/db");
//Modelo BD
const {Salidas} = require("../models/GestionaSalidas/Salidas");
const {Productos} = require('../models/GestionProductos/Productos');

//POST
const crear = async(req, res)=>{
    const {Fecha, Detalle, Cantidad, Monto, idProducto,
    idSucursal} = req.body;

    const salida = new Salidas({
        Fecha,
        Detalle,
        idProducto,
        Cantidad,
        Monto,
        idSucursal
    });

    let Total;

    //SESION PARA QUE SE EJECUTEN TODAS LAS CONSULTAS
    const session = await Salidas.startSession();
    session.startTransaction();
    try {
        const opts = { session };
        //PRIMERA CONSULTA GUARDAR LA ENTRADA
        const A = await salida.save();
        //SEGUNDA CONSULTA OBTENER EL VALOR DE EXISTENCIAS DE PRODUCTO
        const B = await Productos.findOne({_id : idProducto}, (error, data) =>{
            //SUMAR LAS EXISTENCIAS Y LA CANTIDAD DE ENTRADA
            Total = data.Existencias - Cantidad;
        });
        //HACER LA ACTUALIZACION DE EXISTENCIAS EN PRODUCTO
        const C = await Productos.findOneAndUpdate({_id : idProducto},
            {Existencias : Total});

        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({
            mensaje : "Entrada agregada exitosamente"
        });
    } catch (error) {
        // If an error occurred, abort the whole transaction and
        // undo any changes that might have happened
        await session.abortTransaction();
        session.endSession();
        throw error; 
    }

}

//GET
const listar = async(req, res) =>{
    await Salidas.find({}, (error, data) =>{
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