const mongoose = require('mongoose');
const { direccionesSchema } = require('./Direcciones');

const contactoSchema = mongoose.Schema({
    Direccion : direccionesSchema,
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
module.exports = {contactoSchema ,Contactos};