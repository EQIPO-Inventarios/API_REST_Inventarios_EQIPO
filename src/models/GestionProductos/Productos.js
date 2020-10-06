const mongoose = require('mongoose');
const {proveedorSchema} = require('../GestionProveedores/Proveedores');

const productoSchema = mongoose.Schema(
  {
    CodigoProducto: {
      type : String,
      required : true,
      trim : true,
    },
    NombreProducto: {
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
    Proveedor: proveedorSchema,
    Precio_Unitario: {
      type : Number,
      required : true
    },
    Estado: {
      type: Boolean,
      default: true
    }

});


const Productos = mongoose.model('Productos', productoSchema)

module.exports = {Productos, productoSchema};