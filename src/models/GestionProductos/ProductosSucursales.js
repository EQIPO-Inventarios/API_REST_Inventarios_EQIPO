const mongoose = require('mongoose');
const {proveedorSchema} = require('../GestionProveedores/Proveedores');

const productoSucursalesSchema = mongoose.Schema(
  {
    idSucursal: {
        type : String,
        required : true,
        trim : true,
    },
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


const ProductoSucursales = mongoose.model('ProductoSucursales', productoSucursalesSchema)