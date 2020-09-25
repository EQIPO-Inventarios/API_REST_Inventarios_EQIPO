const mongoose = require('mongoose');
const {productoSchema} = require('../GestionProductos/Productos');
const {sucursalSchema} = require('../GestionSucursales/Sucursales');

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
    Sucursal: sucursalSchema

});


const Entradas = mongoose.model('Entradas', entradaSchema)

module.exports = Entradas