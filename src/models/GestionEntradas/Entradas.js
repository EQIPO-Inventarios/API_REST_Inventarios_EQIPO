const mongoose = require('mongoose');
const {productoSchema} = require('../GestionProductos/Productos');
const {sucursalSchema} = require('../GestionSucursales/Sucursales');
const {ubicacion_bodegaSchema} = require('../GestionarBodegas/UbicacionBodega');

const entradaSchema = mongoose.Schema(
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
    Producto: productoSchema,
    Cantidad: {
        type : Number,
        required : true
    },
    Monto: {
        type : Number,
        required : true
    },
    Sucursal: sucursalSchema,
    Ubicacion_Bodega: ubicacion_bodegaSchema

});


const Entradas = mongoose.model('Entradas', entradaSchema)

module.exports = Entradas