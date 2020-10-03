const mongoose = require("mongoose");
const {estadosCivilesSchema} = require("./Estados_Civiles");
const {contactoSchema} = require("./Contactos")


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
        type : String,
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
    Contacto : contactoSchema,
    idSucursal : {
        type: String,
        require: true
    },
    Estado : {
        type: Boolean,
        default : true
    }
});


const Personal = mongoose.model('Personales',personalSchema);
module.exports = {personalSchema, Personal};
