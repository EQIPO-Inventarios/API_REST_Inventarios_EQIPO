const mongoose = require('mongoose');

const contactoSchema = mongoose.Schema({
    Direccion : {
        type : mongoose.Schema.Types.ObjectId,
        require : true
    },
    Telefono : {
        type : String,
        trim : true,
        require : true
    },
    Correo : {
        type : String,
        trim : true,
        require : true
    }
});

const Contactos = mongoose.model("Contactos", contactoSchema);
module.exports = Contactos;