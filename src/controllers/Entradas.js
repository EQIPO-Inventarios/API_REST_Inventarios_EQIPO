//Conexion BD
const pool = require("../settings/db");
//Modelo BD
const {Entradas} = require ('../models/GestionEntradas/Entradas');
const {Productos} = require('../models/GestionProductos/Productos');
const format = require('dateformat');

//POST
const crear = async(req, res)=>{
    const {Fecha, Detalle, Cantidad, Monto, idProducto,
    idSucursal} = req.body;

    //ALMACENA LA NUEVA CANTIDAD DE EXISTENCIAS DE UN PRODUCTO
    let Total;

    const entrada = new Entradas({
        Fecha,
        Detalle,
        idProducto,
        Cantidad,
        Monto,
        idSucursal
    })

    const A = await Productos.findById({_id : idProducto})
    .then(x=>{
        Total = x.Existencias + Cantidad;
        const B = Productos.findByIdAndUpdate({_id : idProducto},
            {Existencias : Total})
        .then(x=>{
            console.log(x);
            const C = entrada.save()
            .then(x=>{
                res.status(200).json({
                    mensaje : "Entrada guardada exitosamente",
                    x
                })
            }).catch(x=>{
                Total -= Cantidad;
                const B = Productos.findByIdAndUpdate({_id : idProducto},
                    {Existencias : Total})
                .then(x2=>{
                    res.status(400).json({
                        mensaje : "No se pudo guardar la entrada",
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
            mensaje : "Error, No se encuentra el producto",
            x
        })
    })
}

//GET
const listar = async(req, res) =>{
    let model =await Entradas.find({}, (error, data) =>{
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
            Monto: element.Monto,
            idSucursal: element.idSucursal}

         model2.push(model3)    
        
    })

    res.json(model2);
}


//PUT
const actualizar = async(req, res)=>{

    const {id, Detalle, Cantidad, Monto, idProducto} = req.body;

    //Diferencia de cantidad de producto de la entrada a actualizar
    let  difCantidad = 0
    //Total de producto que sera la nueva existencia del producto
    let Total = 0;

    const A = await Entradas.findById({_id : id})
    .then(x=>{
        difCantidad = Cantidad - x.Cantidad;
        const B = Productos.findById({_id : idProducto})
        .then(x=>{
            Total = x.Existencias + difCantidad;
            const C = Productos.findByIdAndUpdate({_id : idProducto},
                {Existencias : Total})
            .then(x=>{
                const D = Entradas.findByIdAndUpdate({_id : id},
                    {Detalle : Detalle, Cantidad : Cantidad, Monto : Monto})
                .then(x=>{
                    res.status(200).json({
                        mensaje : "Entrada actualizada exitosamente",
                        x
                    })
                }).catch(x=>{
                    Total -= difCantidad;
                    const C = Productos.findByIdAndUpdate({_id : id},
                        {Existencias : Total})
                    .then(x2=>{
                        res.status(400).json({
                            mensaje : "Error al actualizar la entrada",
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
                mensaje : "Error al encontrar el producto",
                x
            })
        })
    }).catch(x=>{
        res.status(400).json({
            mensaje : "Error al encontrar la entrada",
            x
        })
    })
}

//GET
const listarId = async(req, res) =>{
    const idSucursal = req.params.idSucursal;
    console.log(idSucursal);
    let model = await Entradas.find({idSucursal : idSucursal}, (error, data) =>{
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
            Monto: element.Monto,
            idSucursal: element.idSucursal}

         model2.push(model3)    
        
    })

    res.json(model2);
}


module.exports = {crear, listar, actualizar, listarId}