const mongoose = require('mongoose');
const {productoSchema} = require('../GestionProductos/Productos');
const {sucursalSchema} = require('../GestionSucursales/Sucursales');

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
    idProducto: {
        type : String,
        trim : true,
        required : true
    },
    Cantidad: {
        type : Number,
        required : true
    },
    idSucursal: {
        type : String,
        trim : true,
        required : true
    },
    EstadoPeticion: {
        type : Number,
        required : true
    }
    
});


const PeticionEntradas = mongoose.model('PeticionEntradas', peticion_entradaSchema)

module.exports = {PeticionEntradas, peticion_entradaSchema}