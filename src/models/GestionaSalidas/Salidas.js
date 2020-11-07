const mongoose = require('mongoose');
const {productoSchema} = require('../GestionProductos/Productos');
const {sucursalSchema} = require('../GestionSucursales/Sucursales');

const salidaSchema = mongoose.Schema(
    {
    Fecha: {
        type : Date,
        required : true
    },
    Detalle: {
        type : String,
        trim : true,
        required : true
    },
    idProducto: {
        type : String,
        trim : true,
        required : true
    },
    Cantidad: {
        type : Number,
        required : true
    },
    Monto: {
        type : Number,
        required : true
    },
    idSucursal: {
        type : String,
        trim : true,
        required : true
    },
    idSucursalDestino: {
        type : String,
        trim : true,
        required : true
    }
    
});


const Salidas = mongoose.model('Salidas', salidaSchema)

module.exports = {Salidas, salidaSchema}