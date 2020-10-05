const express = require("express"),
path = require("path"),
app = express.Router()


const Usuarios = require("../controllers/Usuarios")
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.resolve(__dirname,"./swagger/swagger.yaml"));
const Niveles = require("../controllers/Niveles");
const Departamentos = require("../controllers/Deparatamentos");
const Proveedores = require("../controllers/Proveedores");
const Sucursales = require('../controllers/Sucursales');
const Bodegas = require("../controllers/Bodegas");
const tokenValidator = require("../middleware/tokenValidator");




app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// usuarios
app.get("/Usuarios/listar", tokenValidator.rutasProtegidas ,Usuarios.listarUsuarios);
app.post("/Usuarios/login", Usuarios.login);
app.post("/Usuarios/crear",tokenValidator.rutasProtegidas , Usuarios.crear);
app.put("/Usuarios/actualizar", tokenValidator.rutasProtegidas, Usuarios.actualizar);
app.delete("/Usuarios/eliminar/:_id", tokenValidator.rutasProtegidas, Usuarios.eliminar);

// niveles de usuario.
app.post("/Niveles/crear", tokenValidator.rutasProtegidas , Niveles.crear);
app.delete("/Niveles/eliminar/:_id", tokenValidator.rutasProtegidas , Niveles.eliminar);
app.put("/Niveles/actualizar", tokenValidator.rutasProtegidas , Niveles.actualizar);
app.get("/Niveles/listar", tokenValidator.rutasProtegidas ,Niveles.listar);

//Departamentos

app.get("/Departamentos/listar", tokenValidator.rutasProtegidas ,Departamentos.listar);

//Proveedores

app.get("/Proveedores/listar", tokenValidator.rutasProtegidas ,  Proveedores.listar);
app.post("/Proveedores/crear", tokenValidator.rutasProtegidas , Proveedores.crear);
app.put("/Proveedores/actualizar", tokenValidator.rutasProtegidas , Proveedores.actualizar);
app.delete("/Proveedores/eliminar/:_id", tokenValidator.rutasProtegidas , Proveedores.eliminar);

//Sucursales
app.post("/Sucursales/crear",tokenValidator.rutasProtegidas , Sucursales.crear);
app.get("/Sucursales/listar",tokenValidator.rutasProtegidas , Sucursales.listar);
app.put("/Sucursales/actualizar",tokenValidator.rutasProtegidas , Sucursales.actualizar);
app.delete("/Sucursales/eliminar/:_id",tokenValidator.rutasProtegidas , Sucursales.eliminar);

//Bodegas
app.put("/Bodegas/crear", Bodegas.crear);

app.get("/token", (req, res)=>{
   res.send(tokenValidator.generateToken('usuario de prueba'))
})




module.exports = app;