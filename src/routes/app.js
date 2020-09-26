const express = require("express"),
path = require("path"),
app = express.Router();

const Usuarios = require("../controllers/Usuarios")
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.resolve(__dirname,"./swagger/swagger.yaml"));
const Niveles = require("../controllers/Niveles");
const Departamentos = require("../controllers/Deparatamentos");
const Proveedores = require("../controllers/Proveedores");
const Sucursales = require('../controllers/Sucursales');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// usuarios
app.get("/Usuarios/listar",Usuarios.listarUsuarios);
app.post("/Usuarios/login", Usuarios.login);

// niveles de usuario.
app.post("/Niveles/crear", Niveles.crear);
app.delete("/Niveles/eliminar/:_id", Niveles.eliminar);
app.put("/Niveles/actualizar", Niveles.actualizar);
app.get("/Niveles/listar",Niveles.listar);

//Departamentos

app.get("/Departamentos/listar",Departamentos.listar);

//Proveedores

app.get("/Proveedores/listar", Proveedores.listar);
app.post("/Proveedores/crear", Proveedores.crear);
app.put("/Proveedores/actualizar", Proveedores.actualizar);
app.delete("/Proveedores/eliminar/:_id", Proveedores.eliminar);

//Sucursales
app.post("/Sucursales/crear", Sucursales.crear);
app.get("/Sucursales/listar", Sucursales.listar);


module.exports = app;