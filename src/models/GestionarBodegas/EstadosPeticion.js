const mongoose = require('mongoose');

const peticion_entradaSchema = mongoose.Schema(
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

const PeticionEntrada = mongoose.model('Peticiones_Entrada', peticion_entradaSchema)

module.exports = PeticionEntrada