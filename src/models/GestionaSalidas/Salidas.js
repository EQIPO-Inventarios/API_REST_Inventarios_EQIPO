const mongoose = require('mongoose');

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


const Salidas = mongoose.model('Salidas', salidaSchema)

module.exports = Salidas