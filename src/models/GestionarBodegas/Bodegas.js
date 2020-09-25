const mongoose = require('mongoose');

const bodegaSchema = mongoose.Schema(
    {
    Sucursal: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Sucursales',
        required : true
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
        required: true
    }

});


const Bodegas = mongoose.model('Bodegas', bodegaSchema)

module.exports = {Bodegas, bodegaSchema};