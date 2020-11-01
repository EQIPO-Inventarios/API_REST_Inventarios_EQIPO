//Conexion BD
const pool = require("../settings/db");
//Modelo BD
const {Proveedores} = require("../models/GestionProveedores/Proveedores");
const {direccionesSchema, direccion} = require("../models/GestionUsuarios/Direcciones");
const {contactoSchema, contacto} = require("../models/GestionUsuarios/Contactos");


//GET
const listar = async(req, res) =>{
    await Proveedores.find({Estado : true}, (error, data) =>{
        if(error){
            res.json({
                mensaje : "Error al listar los provedores",
                error
            });
        }else{
            res.status(200).json(
                data
            );
        }
    });
}

const buscar = async (req, res) =>{
    const id = req.params.id;
    await Proveedores.findById(id)
    .exec()
    .then (x => { res.status(200).send(x) })
}

//POST
const crear = async(req, res) =>{
    const {Nombre, Razon_Social, Correo, Telefono, Departamento, Municipio, Descripcion} = req.body;
    const Direccion = ({
        Departamento,
        Municipio,
        Descripcion
    })
    const Contacto =  ( {
        Direccion,
        Telefono,
        Correo
    })
    const proveedor = new Proveedores({
        Nombre,
        Razon_Social,
        Contacto
    });

    const model = await Proveedores.findOne({Nombre : proveedor.Nombre})
    if(model){
        res.json({
            status : 412,
            message : "Nombre de Proveedor ya existente"
        })
    }else{
        proveedor.save((error, data) =>{
            if(error){
                return res.json({
                    mensaje : "Error al agregar un nuevo proveedor",
                    error
                });
            }else{
                return res.status(200).json({
                    mensaje : "Proveedor agregado exitosamente",
                    data 
                })
            }
        });
    }
}

//PUT
const actualizar = async (req, res) =>{
    
    const {id, Nombre, Razon_Social, Correo, Telefono, Departamento, Municipio, Descripcion} = req.body;

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

    //const model = await Proveedores.findOne({Nombre : Nombre})
    //if(model._id != id){
    //    res.json({
    //        status : 412,
    //        message : "Nombre de Proveedor ya existente"
    //    })
    //}else{
        Proveedores.findOneAndUpdate({_id : id}, 
            {Nombre : Nombre, Razon_Social : Razon_Social, Contacto : Contacto}, (error, data) =>{
    
                if(error){
                    res.json({
                        mensaje : "Error al tratar de actualizar el proveedor",
                        error
                    });
                }else{
                    res.status(200).json({
                        mensaje : "Proveedor actualizado exitosamente",
                        data
                    });
                }
            });
    //}
    
}

//DELETE 
const eliminar = async (req, res) =>{
    const _id = req.params;

    await Proveedores.findOneAndUpdate({_id : _id}, 
        {Estado : false}, (error, data)=>{
        if(error){
            res.json({
                mensaje : "Error al tratar de dar de baja a proveedor",
                error
            });
        }else{
            res.status(200).json({
                mensaje : "Proveedor dado de bajo exitosamente",
                data
            });
        }
    });
}

//GET
const listarPorNombre = async(req, res)=>{
    let regex = new RegExp(req.params.Nombre, "i")
    await Proveedores.find({Nombre : regex, Estado : true}, (error, data)=>{
        if(error){
            res.json({
                mensaje : "Error al listar proveedores",
                error
            })
        }else{
            res.status(200).json(
                data
            )
        }
    });
}


module.exports = {listar, crear, actualizar, eliminar, listarPorNombre} 