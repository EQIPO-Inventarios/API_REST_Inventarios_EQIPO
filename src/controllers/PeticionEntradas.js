//Conexion BD
const pool = require("../settings/db");
//Modelo BD
const {PeticionEntradas} = require("../models/GestionarPeticionEntrada/PeticionEntrada");
const {Salidas} = require("../models/GestionaSalidas/Salidas");
const {Productos} = require('../models/GestionProductos/Productos');

/*
    LOS ESTADOS DE PETICION SERA:
    1: PENDIENTE
    2: ACEPTADA
    3: ENTREGADA
*/

//POST
const crear = async(req, res) =>{
    const {Fecha, Detalle, idProducto, Cantidad, idSucursal} = req.body;
    const EstadoPeticion = 1;

    const peticionEntrada = new PeticionEntradas({
        Fecha,
        Detalle,
        idProducto,
        Cantidad,
        idSucursal,
        EstadoPeticion
    });

    let Total;

    //SESION PARA QUE SE EJECUTEN TODAS LAS CONSULTAS
    const session = await Salidas.startSession();
    session.startTransaction();
    try {
        const opts = { session };
        //PRIMERA CONSULTA GUARDAR LA ENTRADA
        const A = await peticionEntrada.save();
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
            mensaje : "Peticion de Entrada enviada exitosamente"
        });
    } catch (error) {
        // If an error occurred, abort the whole transaction and
        // undo any changes that might have happened
        await session.abortTransaction();
        session.endSession();
        throw error; 
    }
    
}

//GET TODAS LAS PETICIONES
const listar = async(req, res) =>{
    await PeticionEntradas.find({}, (error, data) =>{
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