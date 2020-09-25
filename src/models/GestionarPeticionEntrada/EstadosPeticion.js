const mongoose = require('mongoose');

const estado_peticion_entradaSchema = mongoose.Schema(
    {
    EstadoPeticion : {
        type : String,
        require : true,
        trim : true,
        unique : true
    },
    Numero : {
        type : Number,
        require : true,
    }
});

const PeticionEntrada = mongoose.model('Peticiones_Entradas', peticion_entradaSchema)

module.exports = {PeticionEntrada, estado_peticion_entradaSchema};