const mongoose = require('mongoose');
const {proveedorSchema} = require('../GestionProveedores/Proveedores');
const {ubicacion_bodegaSchema} = require('../GestionarBodegas/UbicacionBodega');

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
    Proveedor: proveedorSchema,
    Precio_Unitario: {
      type : Number,
      required : true
    },
    Ubicacion_Bodega: ubicacion_bodegaSchema,
    Estado: {
      type: Boolean,
      default: true
    }

});


const Productos = mongoose.model('Productos', productoSchema)

module.exports = {Productos, productoSchema};