const mongoose = require("mongoose");

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
    Contacto : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    Estado : {
        type : Boolean,
        default : true
    }
});

const Sucursales  = mongoose.model('Sucursales',sucursalSchema);
module.exports = Sucursales;