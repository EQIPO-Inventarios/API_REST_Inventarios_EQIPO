//Conexion BD
const pool = require("../settings/db");
//Modelo BD
const {PeticionEntradas} = require("../models/GestionarPeticionEntrada/PeticionEntrada");
const {Salidas} = require("../models/GestionaSalidas/Salidas");
const {Entradas} = require("../models/GestionEntradas/Entradas");
const {Productos} = require('../models/GestionProductos/Productos');
const {ProductoSucursales} = require("../models/GestionProductos/ProductoSucursales");
const PeticionEntrada = require("../models/GestionarPeticionEntrada/PeticionEntrada");
const format = require('dateformat');
/*
    LOS ESTADOS DE PETICION SERA:
    1: PENDIENTE
    2: ACEPTADA
    3: ENTREGADA
*/

//POST
const crear = async(req, res) =>{
    const {Fecha, Detalle, idProducto, Cantidad, idSucursal} = req.body;
    const EstadoPeticion = 1;

    const peticionEntrada = new PeticionEntradas({
        Fecha,
        Detalle,
        idProducto,
        Cantidad,
        idSucursal,
        EstadoPeticion
    });

    let Total;

    let CP;

    const A = await Productos.findById({_id : idProducto})
    .then(x=>{
        CP = x.Existencias;
        Total = x.Existencias - Cantidad;
        if(Cantidad <= CP && Cantidad > 0){
            const B = Productos.findByIdAndUpdate({_id : idProducto},
            {Existencias : Total})
            .then(x=>{
                const D = peticionEntrada.save()
                .then(x=>{
                    res.status(200).json({
                        mensaje : "Peticion guardada con exito",
                        x
                    })
                }).catch(x=>{
                    Total -= Cantidad;
                    const B = Productos.findByIdAndUpdate({_id : idProducto},
                        {Existencias : Total})
                    .then(x2=>{
                        res.status(400).json({
                            mensaje : "Error no se guardo la peticion",
                            x
                        })
                    })
                })
            }).catch(x=>{
                res.status(400).json({
                    mensaje : "Error no se pudo actualizar las existencias del producto",
                    x
                })
            })
        }else{
            return res.status(400).jso({
                mensaje : "No se puede sacar mas producto que del que hay en existencia"
            })
        }
    }).catch(x=>{
        res.status(400).json({
            mensaje : "Producto no encontrado",
            x
        })
    })
}

//POST LISTAR LAS PETICIONES SEGUN SU ESTADO
const listar = async(req, res) =>{
    const {EstadoPeticion, idSucursal} = req.body;

    let model = await PeticionEntradas.find({EstadoPeticion : EstadoPeticion, idSucursal : idSucursal},
        (error, data) =>{
        if(error){
            res.json({
                mensaje : "Error al listar las entradas",
                error
            });
        }
    })

    let model2 = [];

    model.forEach(element =>{

        let fecha = element.Fecha
        let fechaArreglada = format(fecha, "dd-mm-yyyy");
        let model3 = {_id : element._id,
            Fecha : fechaArreglada,
            Detalle: element.Detalle,
            idProducto: element.idProducto,
            Cantidad: element.Cantidad,
            idSucursal: element.idSucursal,
            EstadoPeticion : element.EstadoPeticion}

         model2.push(model3)    
        
    })

    res.json(model2);

}

//GET LISTAR TODAS LAS PETICIONES PENDIENTES
const listarTodas = async(req, res) =>{

    let model = await PeticionEntradas.find({EstadoPeticion : 1},
        (error, data) =>{
        if(error){
            res.json({
                mensaje : "Error al listar las peticiones pendientes",
                error
            });
        }
    })
    
    let model2 = [];

    model.forEach(element =>{

        let fecha = element.Fecha
        let fechaArreglada = format(fecha, "dd-mm-yyyy");
        let model3 = {_id : element._id,
            Fecha : fechaArreglada,
            Detalle: element.Detalle,
            idProducto: element.idProducto,
            Cantidad: element.Cantidad,
            idSucursal: element.idSucursal,
            EstadoPeticion : element.EstadoPeticion}

         model2.push(model3)    
        
    })

    res.json(model2);

}
//PUT
const actualizar = async(req, res)=>{

    const {id, Detalle, Cantidad, idProducto} = req.body;

    let  difCantidad = 0;

    let Total = 0;

    //CANTIDAD DE EXISTENCIAS DEL PRODUCTO
    let CP;
    //CANTIDAD DE PRODUCTO EXTRAIDO EN LA PETICION
    let CA;

    const A = await PeticionEntradas.findById({_id : id})
    .then(x=>{
        CA = x.Cantidad;
        difCantidad = CA - Cantidad;
        const B = Productos.findById({_id : idProducto})
        .then(x=>{
            CP = x.Existencias;
            Total = CP + difCantidad;
            if(Cantidad <= (CP + CA) && Cantidad > 0){
                const C = Productos.findByIdAndUpdate({_id : idProducto},
                    {Existencias : Total})
                .then(x =>{
                    const D = PeticionEntradas.findByIdAndUpdate({_id : id},
                        {Detalle : Detalle, Cantidad : Cantidad})
                    .then(x=>{
                        res.status(200).json({
                            mensaje : "Peticion actualizada exitosamente",
                            x
                        })
                    }).catch(x=>{
                        Total -= difCantidad;
                        const C = Productos.findByIdAndUpdate({_id : idProducto},
                            {Existencias : Total})
                        .then(x2=>{
                            res.status(400).json({
                                mensaje : "Error, no se pudo actualizar la peticion",
                                x
                            })
                        })
                    })
                }).catch(x=>{
                    res.status(400).json({
                        mensaje : "Error no se pudo actualizar las existencias del producto",
                        x
                    })
                })
            }else{
                return res.status(400).json({
                    mensaje : "No se puede extraer mas producto que el que hay en existencia"
                })
            }
        }).catch(x=>{
            res.status(400).json({
                mensaje : "Error, no se encontro el producto de la peticion",
                x
            })
        })
    }).catch(x=>{
        res.status(400).json({
            mensaje : "Error, no se encontro la peticion",
            x
        })
    })
}

//DELETE
const eliminar = async (req, res) =>{
    const {_id, idProducto, Cantidad} = req.body;
    let Total = 0;
    
    const A = await Productos.findById({_id : idProducto})
    .then(x=>{
        Total = x.Existencias + Cantidad;
        const B = Productos.findByIdAndUpdate({_id : idProducto},
            {Existencias : Total})
        .then(x=>{
            const C = PeticionEntradas.findByIdAndDelete({_id : _id})
            .then(x=>{
                res.status(200).json({
                    mensaje : "Peticion eliminada exitosamente",
                    x
                })
            }).catch(x=>{
                Total -= Cantidad;
                const B = Productos.findByIdAndUpdate({_id : idProducto},
                    {Existencias : Total})
                .then(x2=>{
                    res.status(400).json({
                        mensaje : "Error, No se pudo eliminar la peticion",
                        x
                    })
                })
            })
        }).catch(x=>{
            res.status(400).json({
                mensaje : "Error no se pudo actualizar las existencias del producto",
                x
            })
        })
    }).catch(x=>{
        res.status(400).json({
            mensaje : "No de encontro el producto",
            x
        })
    })
}

//PUT ACEPTAR PETICION
const aceptar = async(req, res)=>{
    const {_id, Fecha, Detalle, Cantidad, idProducto, idSucursal, idSucursalDestino} = req.body;

    let Monto = 0;

    const A  = await Productos.findById({_id: idProducto})
    .then(x=>{
        Monto = x.Precio_Unitario * Cantidad;
        const salida = new Salidas({
            Fecha : Fecha,
            Detalle : Detalle,
            idProducto : idProducto,
            Cantidad : Cantidad,
            Monto : Monto,
            idSucursal : idSucursal,
            idSucursalDestino : idSucursalDestino
        })

        const B = PeticionEntradas.findByIdAndUpdate({_id : _id},
            {EstadoPeticion : 2})
        .then(x=>{
            const C = salida.save()
            .then(x=>{
                res.status(200).json({
                    mensaje : "Peticion aceptada exitosamente",
                    x
                })
            }).catch(x=>{
                const B = PeticionEntradas.findByIdAndUpdate({_id : _id},
                    {EstadoPeticion : 1})
                .then(x2=>{
                    res.status(400).json({
                        mensaje : "Error, no se pudo aceptar la peticion",
                        x
                    })
                })
            })
        }).catch(x=>{
            res.status(400).json({
                mensaje : "Error, No se pudo actualizar el estado de la peticion",
                x
            })
        })
    }).catch(x=>{
        res.status(400).json({
            mensaje : "Error, No se ha encontrado el producto",
            x
        })
    })
    
}

//PUT PETICION ENTREGADA
const entregada = async(req, res)=>{
    let {_id, Fecha, Detalle, Cantidad, idProducto,
        idSucursalDestino} = req.body;

    let Monto = 0;
    let Total = 0;
    let NombreProducto;
    let idProductoSucursal;
    let idSucursal = idSucursalDestino;

    const A  = await Productos.findById({_id : idProducto})
    .then(x=>{
        Monto = x.Precio_Unitario * Cantidad;
        NombreProducto = x.NombreProducto;
        const C = ProductoSucursales.findOne(
            {NombreProducto : NombreProducto, idSucursal : idSucursalDestino})
        .then(x=>{
            Total = x.Existencias + Cantidad;
            idProductoSucursal = x._id;
            const B = PeticionEntradas.findByIdAndUpdate({_id : _id},
                {EstadoPeticion : 3})
            .then(x=>{
                let idProducto = idProductoSucursal;
                const D = ProductoSucursales.findOneAndUpdate(
                    {_id : idProductoSucursal, idSucursal : idSucursalDestino},
                    {Existencias : Total})
                .then(x=>{
                    console.log(Cantidad);
                    const entrada = new Entradas({
                        Fecha,
                        Detalle,
                        idProducto,
                        Cantidad,
                        Monto,
                        idSucursal
                    })
                    const E = entrada.save()
                    .then(x=>{
                        res.status(200).json({
                            mensaje : "Confirmacion de entrega exitosa",
                            x
                        })
                    }).catch(x=>{
                        const B = PeticionEntradas.findByIdAndUpdate({_id : _id},
                            {EstadoPeticion : 2})
                        .then(x2=>{
                            Total -= Cantidad
                            const D = ProductoSucursales.findOneAndUpdate(
                                {_id : idProductoSucursal, idSucursal : idSucursalDestino},
                                {Existencias : Total})
                            .then(x3=>{
                                res.status(400).json({
                                    mensaje : "No se pudo confirmar la entrega",
                                    x
                                })
                            })  
                        })
                    })
                }).catch(x=>{
                    const B = PeticionEntradas.findByIdAndUpdate({_id : _id},
                        {EstadoPeticion : 2})
                    .then(x2=>{
                        console.log(x);
                        res.status(400).json({
                            mensaje : "No se pudo actualizar las existencias del producto",
                            x
                        })
                    })
                })
            }).catch(x=>{
                res.status(400).json({
                    mensaje : "Error, no se pudo actualizar el estado de la peticion",
                    x
                })
            })
        }).catch(x=>{
            res.status(400).json({
                mensaje : "Error, No se encuentra el producto en tu sucursal",
                x
            })
        })    
    }).catch(x=>{
        res.status(400).json({
            mensaje : "No se encontro el producto",
            x
        })
    })
}

module.exports = {crear, listar, actualizar, eliminar, aceptar, entregada, listarTodas}