//Conexion BD
const pool = require("../settings/db");
//Modelo BD
const {ubicacion_bodegaSchema} = require('../models/GestionarBodegas/UbicacionBodega');
const {bodegaSchema} = require('../models/GestionarBodegas/Bodegas');
const {Entradas} = require ('../models/GestionEntradas/Entradas');
const {Productos} = require('../models/GestionProductos/Productos');

//POST
const crear = async(req, res)=>{
    const {Fecha, Detalle, Cantidad, Monto, idProducto,
    idSucursal, NumeroBodega, Estanterias, Largo, Ancho,
    Estanteria, X, Y} = req.body;

    let Total;

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

    //SESION PARA QUE SE EJECUTEN TODAS LAS CONSULTAS
    const session = await Entradas.startSession();
    session.startTransaction();
    try {
        const opts = { session };
        //PRIMERA CONSULTA GUARDAR LA ENTRADA
        const A = await entrada.save();
        //SEGUNDA CONSULTA OBTENER EL VALOR DE EXISTENCIAS DE PRODUCTO
        const B = await Productos.findOne({_id : idProducto}, (error, data) =>{
            //SUMAR LAS EXISTENCIAS Y LA CANTIDAD DE ENTRADA
            Total = data.Existencias + Cantidad;
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


//PUT
const actualizar = async(req, res)=>{

    const {id, Detalle, Cantidad, Monto, idProducto} = req.body;

    let  difCantidad = 0, Total = 0;

    //SESION PARA QUE SE EJECUTEN TODAS LAS CONSULTAS
    const session = await Entradas.startSession();
    session.startTransaction();
    try {
        const opts = { session };
        //PRIMERA CONSULTA PARA OBTENER LA CANTDAD PASADA
        const A = await Entradas.findOne({_id : id}, (error, data)=>{
            //Sacando la diferencia de cantidad
            difCantidad = Cantidad - data.Cantidad;
            /*console.log("En la entrada " + data.Cantidad);
            console.log("La diferencia " + difCantidad);*/
        });

        //SEGUNDA CONSULTA ACTUALIZACION DE DATOS DE LA ENTRADA
        const B = await Entradas.findOneAndUpdate({_id : id},
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
            mensaje : "Entrada actualizada exitosamente"
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