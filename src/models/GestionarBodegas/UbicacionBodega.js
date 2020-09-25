const mongoose = require('mongoose');

const ubicacion_bodegaSchema = mongoose.Schema(
    {
    Bodega: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Bodegas',
        required : true
    },
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

module.exports = UbicacionBodega