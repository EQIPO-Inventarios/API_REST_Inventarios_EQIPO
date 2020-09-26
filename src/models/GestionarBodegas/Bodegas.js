const mongoose = require('mongoose');
const {sucursalSchema} = require('../GestionSucursales/Sucursales');

const bodegaSchema = mongoose.Schema(
    {
    NumeroBodega: {
        type : Number,
        unique: true,
        default: 1
    },
    Estanterias: {
        type : Number,
        required: true
    },
    Largo: {
        type : Number,
        required: true
    },
    Ancho: {
        type : Number,
        required: true
    },
    Estado: {
        type: Boolean,
        default: true
    }

});


const Bodegas = mongoose.model('Bodegas', bodegaSchema)

module.exports = {Bodegas, bodegaSchema};