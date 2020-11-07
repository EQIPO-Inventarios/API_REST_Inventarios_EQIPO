const mongoose = require('mongoose');
const {productoSchema} = require('../GestionProductos/Productos');

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
    }
});


const Entradas = mongoose.model('Entradas', entradaSchema)

module.exports = {Entradas, entradaSchema}