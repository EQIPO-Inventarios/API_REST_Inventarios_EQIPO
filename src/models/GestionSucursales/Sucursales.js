const mongoose = require("mongoose");
const {contactoSchema} = require('../GestionUsuarios/Contactos');
const {bodegaSchema} = require('../GestionarBodegas/Bodegas');

const sucursalSchema = mongoose.Schema({
    Nombre : {
        type : String,
        required: true,
        trim : true
    },
    Codigo : {
        type : Number,
        required : true,
        unique : true
    },
    Contacto : contactoSchema,
    Bodega: [bodegaSchema],
    Estado : {
        type : Boolean,
        default : true
    }
});


const Sucursales  = mongoose.model('Sucursales',sucursalSchema);
module.exports = {sucursalSchema, Sucursales};