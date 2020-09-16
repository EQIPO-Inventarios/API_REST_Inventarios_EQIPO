const mongoose = require('mongoose')

const nivelesSchema = mongoose.Schema({
  Tipo: {
    type : String,
    require : true,
    trim : true
  },
  Numero : {
    type : Number,
    require : true,
  },
  Estado : {
    type : Boolean,
    default : true
  }
});

const Nivel = mongoose.model('Niveles', nivelesSchema);
module.exports = Nivel;
