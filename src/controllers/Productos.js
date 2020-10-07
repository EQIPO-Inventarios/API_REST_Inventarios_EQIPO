//Conexion BD
const pool = require("../settings/db");
//Modelos BD
const {Productos} = require("../models/GestionProductos/Productos");
const {proveedorSchema} = require("../models/GestionProveedores/Proveedores");
const {contactoSchema} = require("../models/GestionUsuarios/Contactos");
const {direccionesSchema} = require("../models/GestionUsuarios/Direcciones");

//POST 
const crear = async(req, res)=>{
    const {CodigoProducto, NombreProducto, Material, Caracteristicas,
    Existencias, Precio_Unitario, Nombre, Razon_Social, Departamento,
    Municipio, Descripcion, Telefono, Correo} = req.body;
    
    const Direccion = ({
        Departamento,
        Municipio,
        Descripcion
    })

    const Contacto = ({
        Direccion,
        Telefono,
        Correo
    })

    const Proveedor = ({
        Nombre,
        Razon_Social,
        Contacto
    })

    const producto = new Productos({
        CodigoProducto,
        NombreProducto,
        Material,
        Caracteristicas,
        Existencias,
        Proveedor,
        Precio_Unitario
    });

    const model = await Productos.findOne({CodigoProducto : CodigoProducto,
        NombreProducto : NombreProducto})
    
    if(model){
        res. json({
            status : 412,
            mensaje : "Producto ya existente"
        })
    }else{
        producto.save((error, data)=>{
            if(error){
                return res.json({
                    mensaje : "Error al agregar un nuevo productos",
                    error
                })
            }else{
                return res.status(200).json({
                    mensaje : "Producto agregado exitosamente",
                    data
                })
            }
        })
    }
}

//GET
const listar = async(req, res)=>{
    await Productos.find({Estado : true}, (error, data)=>{
        if(error){
            res.json({
                mensaje : "Error al listar productos",
                error
            })
        }else{
            res.status(200).json(
                data
            )
        }
    });
}


module.exports = {crear, listar}