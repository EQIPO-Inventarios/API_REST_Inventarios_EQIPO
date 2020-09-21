const mongoose = require("mongoose");

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
    Estado_Civil : {
        type : mongoose.Types.ObjectId,
        ref : 'Estados_Civiles',
        require : true  
    },
    ContactoUsuario :{
        type : mongoose.Types.ObjectId,
        ref : 'Contactos',
        require : true
    },
    Sucursal : {
        type : mongoose.Types.ObjectId,
        ref : 'Sucursales',
        require : true
    },
    Estado : {
        type: Boolean,
        default : true
    }
});

const Personal = mongoose.model('Personales',personalSchema);
module.exports = Personal;
