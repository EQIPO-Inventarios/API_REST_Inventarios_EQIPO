//Conexion BD
const pool = require("../settings/db");
//Modelo BD
const {ProductoSucursales} = require("../models/GestionProductos/ProductoSucursales");
const {proveedorSchema} = require("../models/GestionProveedores/Proveedores");
const {contactoSchema} = require("../models/GestionUsuarios/Contactos");
const {direccionesSchema} = require("../models/GestionUsuarios/Direcciones");
const Proveedores = require("../models/GestionProveedores/Proveedores");

//POST 
const crear = async(req, res)=>{
    const {idSucursal, CodigoProducto, NombreProducto, Material, Caracteristicas,
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

    const producto = new ProductoSucursales({
        idSucursal,
        CodigoProducto,
        NombreProducto,
        Material,
        Caracteristicas,
        Existencias,
        Proveedor,
        Precio_Unitario
    });

    const model = await ProductoSucursales.findOne({CodigoProducto : CodigoProducto,
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
    let id_sucursal = req.params.id_sucursal;
    console.log(id_sucursal);
    await ProductoSucursales.find({Estado : true, idSucursal : id_sucursal},
        (error, data)=>{
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

//PUT
const actualizar = async(req, res)=>{
    const {id, idSucursal, CodigoProducto, NombreProducto, Material, Caracteristicas,
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

    ProductoSucursales.findOneAndUpdate({_id : id},
        {idSucursal : idSucursal, CodigoProducto : CodigoProducto, NombreProducto : NombreProducto,
        Material : Material, Caracteristicas : Caracteristicas,
        Existencias :  Existencias, Proveedor : Proveedor,
        Precio_Unitario : Precio_Unitario}, (error, data)=>{
            if(error){
                res.json({
                    mensaje : "Error al actualizar el productos",
                    error
                });
            }else{
                res.status(200).json({
                    mensaje : "Datos de productos actualizados correctamente",
                    data
                });
            }
        });

}

//DELETE
const eliminar = async(req, res)=>{
    const id = req.params;

    await ProductoSucursales.findOneAndUpdate({_id : id},
        {Estado : false}, (error, data)=>{
            if(error){
                res.json({
                    mensaje : "Error al tratar de dar de baja a producto",
                    error
                });
            }else{
                res.status(200).json({
                    mensaje : "Producto dado de baja exitosamente",
                    data
                });
            }
        });
}

//POST
const listarPorNombre = async(req, res)=>{
    let regex = new RegExp(req.body.Nombre, "i")
    let idSucursal = req.body.idSucursal ;

    await ProductoSucursales.find({idSucursal : idSucursal, NombreProducto : regex, Estado : true},
        (error, data)=>{
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


module.exports = {crear, listar, actualizar, eliminar, listarPorNombre}