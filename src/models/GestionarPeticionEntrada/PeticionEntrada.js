const mongoose = require('mongoose');
const {estado_peticion_entradaSchema} = require('./EstadosPeticion');
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
    Producto: productoSchema,
    Cantidad: {
        type : Number,
        required : true
    },
    Sucursal: sucursalSchema,
    EstadoPeticion: estado_peticion_entradaSchema
    
});


const PeticionEntrada = mongoose.model('Peticiones_Entradas', peticion_entradaSchema)

module.exports = PeticionEntrada