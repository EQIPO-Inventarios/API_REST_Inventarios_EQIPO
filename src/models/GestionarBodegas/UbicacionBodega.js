const mongoose = require('mongoose');
const {bodegaSchema} = require('./Bodegas');

const ubicacion_bodegaSchema = mongoose.Schema(
    {
    Bodega: bodegaSchema,
    Estanteria: {
        type : Number,
        required : true
    },
    X: {
        type : Number,
        required : true
    },
    Y: {
        type : Number,
        required : true
    }
    
});

const UbicacionBodega = mongoose.model('Ubicaciones_Bodegas', ubicacion_bodegaSchema)

module.exports = {UbicacionBodega, ubicacion_bodegaSchema};