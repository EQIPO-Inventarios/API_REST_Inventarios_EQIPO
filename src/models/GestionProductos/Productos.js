const mongoose = require('mongoose');

const productoSchema = mongoose.Schema(
  {
    Codigo: {
      type : String,
      required : true,
      trim : true,
    },
    Nombre: {
      type : String,
      required : true,
      trim : true,
      unique : true
    },
    Material: {
      type : String,
      required : true,
      trim : true
    },
    Caracteristicas: {
      type : String,
      required : true,
      trim : true
    },
    Existencias: {
      type : Number,
      required : true
    },
    Proveedor: {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Proveedores', 
      required : true
    },
    Precio_Unitario: {
      type : Number,
      required : true
    },
    Ubicacion_Bodega: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "Ubicacion_Bodega",
      required: true
    },
    Estado: {
      type: Boolean,
      required: true
    }

});

const Productos = mongoose.model('Productos', productoSchema)

module.exports = Productos