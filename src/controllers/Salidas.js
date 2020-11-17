//Conexion BD
const pool = require("../settings/db");
//Modelo BD
const {Salidas} = require("../models/GestionaSalidas/Salidas");
const {Productos} = require('../models/GestionProductos/Productos');
const {ProductoSucursales} = require("../models/GestionProductos/ProductoSucursales");
const format = require('dateformat');

//POST
const crear = async(req, res)=>{
    const {Fecha, Detalle, Cantidad, Monto, idProducto,
    idSucursal, idSucursalDestino} = req.body;

    const salida = new Salidas({
        Fecha,
        Detalle,
        idProducto,
        Cantidad,
        Monto,
        idSucursal,
        idSucursalDestino
    });

    //Cantidad a actualizar despues de descontar la cantidad de salida
    let Total;
    //Existencias del producto
    let CP;

    let flag = true;

    if(idSucursal == "5f9121b37ebf700017f7443d"){
        const verificar = await Productos.findById({_id : idProducto})
        .then(x=>{
            CP = x.Existencias;
            if(Cantidad <= CP){
                Total = x.Existencias - Cantidad;
                const A = Productos.findOneAndUpdate({_id : idProducto},
                    {Existencias : Total})
                .then(x=>{
                    const B = salida.save()
                    .then(x=>{
                        res.status(200).json({
                            mensaje : "Salida guardada exitosamente",
                            x
                        })
                    }).catch(x=>{
                        Total += Cantidad;
                        const A = Productos.findOneAndUpdate({_id : idProducto},
                            {Existencias : Total})
                        .then(x2=>{
                            res.status(400).json({
                                mensaje : "Error no se ha podido guardar la salida",
                                x
                            })
                        })
                    })
                }).catch(x=>{
                    res.status(400).json({
                        mensaje : "Error al actualizar las existencias",
                        x
                    })
                })
            }else{
                return res.status(400).json({
                    mensaje : "Error no se puede extraer mas producto del que hay en existencia"
                })
            }
        }).catch(x=>{
            res.status(400).json({
                mensaje : "No se pudo encontrar el producto",
                x
            })
        })
    }else{
        const verificar = await ProductoSucursales.findById({_id : idProducto})
        .then(x=>{
            CP = x.Existencias;
            if(Cantidad <= CP){
                Total = x.Existencias - Cantidad;
                const A = ProductoSucursales.findOneAndUpdate({_id : idProducto},
                    {Existencias : Total})
                .then(x=>{
                    const B = salida.save()
                    .then(x=>{
                        res.status(200).json({
                            mensaje : "Salida guardada exitosamente",
                            x
                        })
                    }).catch(x=>{
                        Total += Cantidad;
                        const A = ProductoSucursales.findOneAndUpdate({_id : idProducto},
                            {Existencias : Total})
                        .then(x2=>{
                            res.status(400).json({
                                mensaje : "Error no se ha podido guardar la salida",
                                x
                            })
                        })
                    })
                }).catch(x=>{
                    res.status(400).json({
                        mensaje : "Error al actualizar las existencias",
                        x
                    })
                })
            }else{
                return res.status(400).json({
                    mensaje : "Error no se puede extraer mas producto del que hay en existencia"
                })
            }
        }).catch(x=>{
            res.status(400).json({
                mensaje : "No se pudo encontrar el producto",
                x
            })
        })
    }
}

//GET
const listar = async(req, res) =>{
    let model = await Salidas.find({}, (error, data) =>{
        if(error){
            res.json({
                mensaje : "Error al listar las entradas",
                error
            });
        }
    });

    let model2 = [];

    model.forEach(element =>{

        let fecha = element.Fecha
        let fechaArreglada = format(fecha, "dd-mm-yyyy");
        let model3 = {_id : element._id,
            Fecha : fechaArreglada,
            Detalle: element.Detalle,
            idProducto: element.idProducto,
            Cantidad: element.Cantidad,
            Monto: element.Monto,
            idSucursal: element.idSucursal,
            idSucursalDestino : element.idSucursalDestino}

         model2.push(model3)    
        
    })

    res.json(model2);
}

//PUT
const actualizar = async(req, res)=>{

    const {id, Detalle, Cantidad, Monto, idProducto} = req.body;

    //DIFERENCIA DE PRODUCTO QUE SE SACARA 
    let  difCantidad = 0
    //TOTAL DE PRODUCTO QUE SE DEVOLVERA O SACARA
    let Total = 0;

    //CANTIDAD DE PRODUCTO EN EXISTENCIA
    let CP;
    //CANTIDAD DE PRODUCTO EXTRAIDO EN LA SALIDA
    let CA;

    //OBTENER DATOS DE LA SALIDA
    const A = await Salidas.findById({_id : id})
    .then(x=>{
        CA = x.Cantidad;
        difCantidad = x.Cantidad - Cantidad;
        if(x.idSucursal == "5f9121b37ebf700017f7443d"){
            const B =  Productos.findById({_id : idProducto})
            .then(x=>{
                Total = x.Existencias + difCantidad;
                const C = Productos.findByIdAndUpdate({_id : idProducto},
                    {Existencias : Total})
                .then(x=>{
                    const D = Salidas.findByIdAndUpdate({_id : id},
                        {Detalle : Detalle, Cantidad : Cantidad, Monto : Monto})
                    .then(x=>{
                        res.status(200).json({
                            mensaje : "Salida actualizada exitosamente",
                            x
                        })
                    }).catch(x=>{
                        Total += difCantidad; 
                        const C = Productos.findByIdAndUpdate({_id : idProducto},
                            {Existencias : Total})
                        .then(x2=>{
                            res.status(400).json({
                                mensaje : "No se ha podido actualizar el producto",
                                x
                            })
                        })
                    })
                }).catch(x=>{
                    res.status(400).json({
                        mensaje : "Error al actualizar las existencias del producto",
                        x
                    })
                })
            }).catch(x=>{
                res.status(400).json({
                    mensaje : "Error no se encontro el producto",
                    x
                })
            })
        }else{

        }
    }).catch(x=>{
        res.status(400).json({
            mensaje : "No se encontro la Salida",
            x
        })
    })
}

module.exports = {crear, listar, actualizar}