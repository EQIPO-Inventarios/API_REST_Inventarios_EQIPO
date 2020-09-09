const express = require("express"),
app = express.Router();

const Usuario = require("../models/Usuario")

var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require("./swagger/swagger.json");

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/*
app.all("/test", (req, res)=>{
    res.send("hola mundo");
})
app.get("/Usuarios/listar",Usuarios.listarUsuarios)
app.post("/Usuarios/login",Usuarios.login)
*/
app.post("/Usuarios/new", (req, res) =>{
    try {
        const user = new Usuario(req.body)
         user.save()
        const token =  user.generateAuthToken()
        res.status(201).send({ user, token })
     } catch (error) {
        res.status(400).send(error)
     }
})


app.get("/prueba",(req, res)=>{
    res.status(200).json({
        saludo : "hola mundo",
        creado : "mi v:"
    })
})

module.exports = app;