//Conexion BD
const pool = require("../settings/db");
//Modelo BD
const {PeticionEntradas} = require("../models/GestionarPeticionEntrada/PeticionEntrada");
const {Salidas} = require("../models/GestionaSalidas/Salidas");
const {Entradas} = require("../models/GestionEntradas/Entradas");
const {Productos} = require('../models/GestionProductos/Productos');
const {ProductoSucursales} = require("../models/GestionProductos/ProductoSucursales");
const PeticionEntrada = require("../models/GestionarPeticionEntrada/PeticionEntrada");
const format = require('dateformat');
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

    let model = await PeticionEntradas.find({EstadoPeticion : EstadoPeticion, idSucursal : idSucursal},
        (error, data) =>{
        if(error){
            res.json({
                mensaje : "Error al listar las entradas",
                error
            });
        }
    })

    let model2 = [];

    model.forEach(element =>{

        let fecha = element.Fecha
        let fechaArreglada = format(fecha, "dd-mm-yyyy");
        let model3 = {_id : element._id,
            Fecha : fechaArreglada,
            Detalle: element.Detalle,
            idProducto: element.idProducto,
            Cantidad: element.Cantidad,
            idSucursal: element.idSucursal,
            EstadoPeticion : element.EstadoPeticion}

         model2.push(model3)    
        
    })

    res.json(model2);

}

//GET LISTAR TODAS LAS PETICIONES PENDIENTES
const listarTodas = async(req, res) =>{

    let model = await PeticionEntradas.find({EstadoPeticion : 1},
        (error, data) =>{
        if(error){
            res.json({
                mensaje : "Error al listar las peticiones pendientes",
                error
            });
        }
    })
    
    let model2 = [];

    model.forEach(element =>{

        let fecha = element.Fecha
        let fechaArreglada = format(fecha, "dd-mm-yyyy");
        let model3 = {_id : element._id,
            Fecha : fechaArreglada,
            Detalle: element.Detalle,
            idProducto: element.idProducto,
            Cantidad: element.Cantidad,
            idSucursal: element.idSucursal,
            EstadoPeticion : element.EstadoPeticion}

         model2.push(model3)    
        
    })

    res.json(model2);

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
            mensaje : "Peticion de entrada actualizada exitosamente"
        });
    } catch (error) {
        // If an error occurred, abort the whole transaction and
        // undo any changes that might have happened
        await session.abortTransaction();
        session.endSession();
        throw error; 
    }
}

//DELETE
const eliminar = async (req, res) =>{
    const {_id, idProducto, Cantidad} = req.body;
    let Total = 0;
    //SESION PARA QUE SE EJECUTEN TODAS LAS CONSULTAS
    const session = await PeticionEntradas.startSession();
    session.startTransaction();
    try {
        const opts = { session };

        //PRIMERA CONSULTA OBTENER LAS EXISTENCIAS Y SUMARLE LO QUE SE HABIA EXTRAIDO
        const B = await Productos.findOne({_id : idProducto}, (error, data)=>{
            Total = data.Existencias + Cantidad;
        });

        //SEGUNDA CONSULTA HACER LA ACTUALIZACION DE EXISTENCIAS EN PRODUCTO
        const D = await Productos.findOneAndUpdate({_id : idProducto},
            {Existencias : Total});

        //TERCERA CONSULTA PARA ELIMINAR LA PETICION
        const A = await PeticionEntradas.findOneAndDelete({_id : _id});

        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({
            mensaje : "Peticion de Entrada eliminada exitosamente"
        });
    } catch (error) {
        // If an error occurred, abort the whole transaction and
        // undo any changes that might have happened
        await session.abortTransaction();
        session.endSession();
        throw error; 
    }
}

//PUT ACEPTAR PETICION
const aceptar = async(req, res)=>{
    const {_id, Fecha, Detalle, Cantidad, idProducto, idSucursal, idSucursalDestino} = req.body;

    let Monto = 0;

    //SESION PARA QUE SE EJECUTEN TODAS LAS CONSULTAS
    const session = await PeticionEntradas.startSession();
    session.startTransaction();
    try {
        const opts = { session };
        //PRIMERA CONSULTA PARA OBTENER EL PRECIO DEL PRODUCTO
        const A = await Productos.findOne({_id : idProducto}, (error, data)=>{
            //Sacando el monto
            Monto = data.Precio_Unitario * Cantidad;
        });

        const salida = new Salidas({
            Fecha : Fecha,
            Detalle : Detalle,
            idProducto : idProducto,
            Cantidad : Cantidad,
            Monto : Monto,
            idSucursal : idSucursal,
            idSucursalDestino : idSucursalDestino
        })

        //SEGUNDA CONSULTA GUARDAR LA SALIDA
        const B = await salida.save();
        
        //TERCERA CONSULTA OBTENER EL VALOR DE EXISTENCIAS DE PRODUCTO
        const C = await PeticionEntradas.findOneAndUpdate({_id : _id},
            {EstadoPeticion : 2});

        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({
            mensaje : "Peticion de Entrada aceptada"
        });
    } catch (error) {
        // If an error occurred, abort the whole transaction and
        // undo any changes that might have happened
        await session.abortTransaction();
        session.endSession();
        throw error; 
    }
}

//PUT PETICION ENTREGADA
const entregada = async(req, res)=>{
    const {_id, Fecha, Detalle, Cantidad, idProducto,
        idSucursal} = req.body;

    let Monto = 0;
    let Total = 0;

    //SESION PARA QUE SE EJECUTEN TODAS LAS CONSULTAS
    const session = await PeticionEntradas.startSession();
    session.startTransaction();
    try {
        const opts = { session };
        //PRIMERA CONSULTA PARA OBTENER EL PRECIO DEL PRODUCTO
        const A = await ProductoSucursales.findOne({_id : idProducto, idSucursal : idSucursal}, (error, data)=>{
            //Sacando el monto
            Monto = data.Precio_Unitario * Cantidad;
            Total = data.Existencias + Cantidad 
        });

        const entrada =  await new Entradas({
            Fecha,
            Detalle,
            idProducto,
            Cantidad,
            Monto,
            idSucursal
        })

        //SEGUNDA CONSULTA GUARDAR LA SALIDA
        const B = await entrada.save();
        
        //TERCERA CONSULTA OBTENER EL VALOR DE EXISTENCIAS DE PRODUCTO
        const C = await PeticionEntradas.findOneAndUpdate({_id : _id},
            {EstadoPeticion : 3});

        //CUARTA CONSULTA SUMAR LA ENTRADA AL MODELO PRODUCTOSUCURSALES
        const D = await ProductoSucursales.findOneAndUpdate({_id : idProducto, idSucursal : idSucursal},
            {Existencias : Total});

        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({
            mensaje : "Peticion de Entrada aceptada"
        });
    } catch (error) {
        // If an error occurred, abort the whole transaction and
        // undo any changes that might have happened
        await session.abortTransaction();
        session.endSession();
        throw error; 
    }
}

module.exports = {crear, listar, actualizar, eliminar, aceptar, entregada, listarTodas}