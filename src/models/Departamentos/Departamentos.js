const mongoose = require('mongoose');

const departamentosSchema = mongoose.Schema({
    Departamento : {
        type : String
    },
    Municipios : {
        type :[String]
    }

});

const Departamentos = mongoose.model("Departamentos", departamentosSchema);

module.exports = Departamentos;