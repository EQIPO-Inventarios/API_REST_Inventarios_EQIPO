const express = require("express"),
app = express.Router();

const Usuarios = require("../controllers/Usuarios")

/*var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
*/

app.all("/test", (req, res)=>{
    res.send("hola mundo");
})


app.all("/listUsuarios",Usuarios.listarUsuarios)

module.exports = app;