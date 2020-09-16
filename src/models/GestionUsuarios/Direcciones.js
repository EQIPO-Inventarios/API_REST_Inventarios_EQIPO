const mongoose = require('mongoose');

const direccionesSchema = mongoose.Schema({
    Departamento : {
        type : String,
        require : true,
        trim : true
    },
    Municipio : {
        type : String,
        require : true,
        trim : true
    },
    Descripcion : {
        type : String,
        require : true,
        trim : true
    }
});

const Direcciones = mongoose.model('Direcciones', direccionesSchema);
module.exports = Direcciones;