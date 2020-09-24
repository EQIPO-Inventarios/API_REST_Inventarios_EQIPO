const mongoose = require('mongoose');
const { contactoSchema } = require('../GestionUsuarios/Contactos');

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
    Contacto: contactoSchema,
    Estado: {
      type : Boolean,
      default: true
    }

});


const Proveedor = mongoose.model('Proveedores', proveedorSchema)

module.exports = Proveedor