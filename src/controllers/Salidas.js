//Conexion BD
const pool = require("../settings/db");
//Modelo BD
const {Salidas} = require("../models/GestionaSalidas/Salidas");
const {Productos} = require('../models/GestionProductos/Productos');
const format = require('dateformat');

//POST
const crear = async(req, res)=>{
    const {Fecha, Detalle, Cantidad, Monto, idProducto,
    idSucursal, idSucursalDestino} = req.body;

    const salida = new Salidas({
        Fecha,
        Detalle,
        idProducto,
        Cantidad,
        Monto,
        idSucursal,
        idSucursalDestino
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
    let model = await Salidas.find({}, (error, data) =>{
        if(error){
            res.json({
                mensaje : "Error al listar las entradas",
                error
            });
        }
    });

    let model2 = [];

    model.forEach(element =>{

        let fecha = element.Fecha
        let fechaArreglada = format(fecha, "dd-mm-yyyy");
        let model3 = {_id : element._id,
            Fecha : fechaArreglada,
            Detalle: element.Detalle,
            idProducto: element.idProducto,
            Cantidad: element.Cantidad,
            Monto: element.Monto,
            idSucursal: element.idSucursal,
            idSucursalDestino : element.idSucursalDestino}

         model2.push(model3)    
        
    })

    res.json(model2);
}

//PUT
const actualizar = async(req, res)=>{

    const {id, Detalle, Cantidad, Monto, idProducto} = req.body;

    let  difCantidad = 0, Total = 0;

    //SESION PARA QUE SE EJECUTEN TODAS LAS CONSULTAS
    const session = await Salidas.startSession();
    session.startTransaction();
    try {
        const opts = { session };
        //PRIMERA CONSULTA PARA OBTENER LA CANTDAD PASADA
        const A = await Salidas.findOne({_id : id}, (error, data)=>{
            //Sacando la diferencia de cantidad
            difCantidad = data.Cantidad - Cantidad;
            /*console.log("En la entrada " + data.Cantidad);
            console.log("La diferencia " + difCantidad);*/
        });

        //SEGUNDA CONSULTA ACTUALIZACION DE DATOS DE LA ENTRADA
        const B = await Salidas.findOneAndUpdate({_id : id},
            {Detalle : Detalle, Cantidad : Cantidad, Monto : Monto});
        
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