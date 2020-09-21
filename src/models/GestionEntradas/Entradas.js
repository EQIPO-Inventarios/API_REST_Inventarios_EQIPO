const mongoose = require('mongoose');

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
    Producto: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Productos',
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
    Sucursal: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Sucursales',
        required : true
    }

});


const Entradas = mongoose.model('Entradas', entradaSchema)

module.exports = Entradas