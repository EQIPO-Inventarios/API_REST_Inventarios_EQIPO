const mongoose = require("mongoose");
const {estadosCivilesSchema} = require("./Estados_Civiles");
const {contactoSchema} = require("./Contactos")
const {sucursalSchema} = require("../GestionSucursales/Sucursales")

const personalSchema = mongoose.Schema({
    Nombres : {
        type : String,
        require : true,
        trim : true
    },
    Apellidos : {
        type : String,
        require : true,
        trim : true
    },
    Fecha_Nacimiento : {
        type : Date,
        require : true  
    },
    DUI :{
        type : String,
        unique : true,
        trim : true,
        require : true     
    },
    NIT : {
        type : String,
        unique : true,
        trim : true,
        require : true  
    },
    Estado_Civil : estadosCivilesSchema,
    ContactoUsuario : contactoSchema,
    Sucursal : sucursalSchema,
    Estado : {
        type: Boolean,
        default : true
    }
});


const Personal = mongoose.model('Personales',personalSchema);
module.exports = {personalSchema, Personal};
