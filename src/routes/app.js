const express = require("express"),
app = express.Router();

const Usuarios = require("../controllers/Usuarios")

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
app.get("/Usuarios/listar",Usuarios.listarUsuarios)
app.post("/Usuarios/login", Usuarios.login)





app.get("/prueba",(req, res)=>{
    res.status(200).json({
        saludo : "hola mundo",
        creado : "mi v:"
    })
})

module.exports = app;