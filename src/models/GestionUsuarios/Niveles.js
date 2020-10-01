const mongoose = require('mongoose')

const nivelesSchema = mongoose.Schema({
  TipoNivel: {
    type : String,
    require : true,
    trim : true
  },
  NumeroNivel : {
    type : Number,
    require : true,
  },
  Estado : {
    type : Boolean,
    default : true
  }
});

const Nivel = mongoose.model('Niveles', nivelesSchema);
module.exports = {nivelesSchema, Nivel};
