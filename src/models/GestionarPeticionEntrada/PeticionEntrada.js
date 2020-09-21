const mongoose = require('mongoose');

const peticion_entradaSchema = mongoose.Schema(
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
    Sucursal: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Sucursales',
        required : true
    },
    EstadoPeticion: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'EstadosPeticion',
        required : true
    }
    
});


const PeticionEntrada = mongoose.model('Peticiones_Entradas', peticion_entradaSchema)

module.exports = PeticionEntrada