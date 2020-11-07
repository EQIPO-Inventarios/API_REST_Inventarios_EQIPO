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
const Productos = require("../controllers/Productos");
const Entradas = require("../controllers/Entradas");
const Salidas = require("../controllers/Salidas");
const PeticionEntradas = require("../controllers/PeticionEntradas");
const ProductoSucursales = require("../controllers/ProductoSucursales");
const tokenValidator = require("../middleware/tokenValidator");
const { token } = require("morgan");
const { rutasProtegidas } = require("../middleware/tokenValidator");




app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// usuarios
app.get("/Usuarios/listar", tokenValidator.rutasProtegidas ,Usuarios.listarUsuarios);
app.get("/Usuarios/buscarUsuarios/:Usuario", tokenValidator.rutasProtegidas, Usuarios.buscarUsuarios);
app.get("/Usuarios/buscar/:id", tokenValidator.rutasProtegidas, Usuarios.buscar);
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
app.get("/Proveedores/buscar/:id", tokenValidator.rutasProtegidas , Proveedores.buscar);
app.get("/Proveedores/listarPorNombre/:Nombre", tokenValidator.rutasProtegidas, Proveedores.listarPorNombre);
app.post("/Proveedores/crear", tokenValidator.rutasProtegidas , Proveedores.crear);
app.put("/Proveedores/actualizar", tokenValidator.rutasProtegidas , Proveedores.actualizar);
app.delete("/Proveedores/eliminar/:_id", tokenValidator.rutasProtegidas , Proveedores.eliminar);

//Sucursales
app.post("/Sucursales/crear",tokenValidator.rutasProtegidas , Sucursales.crear);
app.get("/Sucursales/listar",tokenValidator.rutasProtegidas , Sucursales.listar);
app.get("/Sucursales/listarPorNombre/:Nombre", tokenValidator.rutasProtegidas, Sucursales.listarPorNombre);
app.get("/Sucursales/buscar/:id",tokenValidator.rutasProtegidas , Sucursales.buscar);
app.put("/Sucursales/actualizar",tokenValidator.rutasProtegidas , Sucursales.actualizar);
app.delete("/Sucursales/eliminar/:_id",tokenValidator.rutasProtegidas , Sucursales.eliminar);

//Productos
app.post("/Productos/crear", tokenValidator.rutasProtegidas, Productos.crear);
app.get("/Productos/listar", tokenValidator.rutasProtegidas, Productos.listar);
app.get("/Productos/listarPorNombre/:Nombre", tokenValidator.rutasProtegidas, Productos.listarPorNombre);
app.put("/Productos/actualizar", tokenValidator.rutasProtegidas, Productos.actualizar);
app.delete("/Productos/eliminar/:_id",tokenValidator.rutasProtegidas , Productos.eliminar);

//Productos Sucursales
app.post("/ProductoSucursales/crear", tokenValidator.rutasProtegidas, ProductoSucursales.crear);
app.get("/ProductoSucursales/listar/:id_sucursal", tokenValidator.rutasProtegidas, ProductoSucursales.listar);
app.post("/ProductoSucursales/listarPorNombre", tokenValidator.rutasProtegidas, ProductoSucursales.listarPorNombre);
app.put("/ProductoSucursales/actualizar", tokenValidator.rutasProtegidas, ProductoSucursales.actualizar);
app.delete("/ProductoSucursales/eliminar/:_id",tokenValidator.rutasProtegidas , ProductoSucursales.eliminar);

//Entradas
app.post("/Entradas/crear", tokenValidator.rutasProtegidas, Entradas.crear);
app.get("/Entradas/listar", tokenValidator.rutasProtegidas, Entradas.listar);
app.put("/Entradas/actualizar", tokenValidator.rutasProtegidas, Entradas.actualizar);

//Salidas
app.post("/Salidas/crear", tokenValidator.rutasProtegidas, Salidas.crear);
app.get("/Salidas/listar", tokenValidator.rutasProtegidas, Salidas.listar);
app.put("/Salidas/actualizar", tokenValidator.rutasProtegidas, Salidas.actualizar);

//Peticiones de entrada
app.post("/PeticionEntradas/crear", tokenValidator.rutasProtegidas, PeticionEntradas.crear);
app.post("/PeticionEntradas/listar", tokenValidator.rutasProtegidas, PeticionEntradas.listar);
app.get("/PeticionEntradas/listarTodas", tokenValidator.rutasProtegidas, PeticionEntradas.listarTodas);
app.put("/PeticionEntradas/actualizar", tokenValidator.rutasProtegidas, PeticionEntradas.actualizar);
app.put("/PeticionEntradas/aceptar", tokenValidator.rutasProtegidas, PeticionEntradas.aceptar);
app.put("/PeticionEntradas/entregada", tokenValidator.rutasProtegidas, PeticionEntradas.entregada);
app.delete("/PeticionEntradas/eliminar", tokenValidator.rutasProtegidas, PeticionEntradas.eliminar);

app.get("/token", (req, res)=>{
   res.send(tokenValidator.generateToken('usuario de prueba'))
})





module.exports = app;