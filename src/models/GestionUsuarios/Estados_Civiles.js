const mongoose = require('mongoose');

const estadosCivilesSchema = mongoose.Schema({
    Tipo : {
        type : String,
        require : true,
        trim : true
    },
    Numero : {
        type : Number,
        require : true
    }
});

const  Estados_Civiles = mongoose.model('Estados_Civiles', estadosCivilesSchema);
module.exports = Estados_Civiles;