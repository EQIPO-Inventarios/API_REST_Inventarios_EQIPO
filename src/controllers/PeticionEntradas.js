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

//POST LISTAR LAS PETICIONES SEGUN SU ESTADO
const listar = async(req, res) =>{
    const {EstadoPeticion, idSucursal} = req.body;

    await PeticionEntradas.find({EstadoPeticion : EstadoPeticion, idSucursal : idSucursal},
        (error, data) =>{
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

//PUT
const actualizar = async(req, res)=>{

    const {id, Detalle, Cantidad, idProducto} = req.body;

    let  difCantidad = 0, Total = 0;

    //SESION PARA QUE SE EJECUTEN TODAS LAS CONSULTAS
    const session = await PeticionEntradas.startSession();
    session.startTransaction();
    try {
        const opts = { session };
        //PRIMERA CONSULTA PARA OBTENER LA CANTDAD PASADA
        const A = await PeticionEntradas.findOne({_id : id}, (error, data)=>{
            //Sacando la diferencia de cantidad
            difCantidad = data.Cantidad - Cantidad;
            /*console.log("En la entrada " + data.Cantidad);
            console.log("La diferencia " + difCantidad);*/
        });

        //SEGUNDA CONSULTA ACTUALIZACION DE DATOS DE LA PETICION DE SALIDA
        const B = await PeticionEntradas.findOneAndUpdate({_id : id},
            {Detalle : Detalle, Cantidad : Cantidad});
        
        //TERCERA CONSULTA OBTENER EL VALOR DE EXISTENCIAS DE PRODUCTO
        const C = await Productos.findOne({_id : idProducto}, (error, data) =>{
            //SUMAR LAS EXISTENCIAS Y LA DIFERENCIA DE LA ENTRADA Y SU ACTUALIZACION
            Total = data.Existencias + difCantidad;
            //console.log("El total " + Total);
        });

        //CUARTA CONSULTA HACER LA ACTUALIZACION DE EXISTENCIAS EN PRODUCTO
        const D = await Productos.findOneAndUpdate({_id : idProducto},
            {Existencias : Total});

        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({
            mensaje : "Salida actualizada exitosamente"
        });
    } catch (error) {
        // If an error occurred, abort the whole transaction and
        // undo any changes that might have happened
        await session.abortTransaction();
        session.endSession();
        throw error; 
    }
}

module.exports = {crear, listar, actualizar}