const mongoose = require('mongoose');

const proveedorSchema = mongoose.Schema(
    {
    Nombre: {
      type : String,
      required: true,
      trim: true
    },
    Razon_Social: {
      type : String,
      required: true,
      trim: true
    },
    Contacto: {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Contactos',
      required: true
    },
    Estado: {
      type : Boolean,
      default: true
    }

});


const Proveedor = mongoose.model('Proveedores', proveedorSchema)

module.exports = Proveedor