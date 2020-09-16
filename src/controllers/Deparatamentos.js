const pool = require("../settings/db");
const Departamentos = require('../models/Departamentos/Departamentos');

const listar = async (req, res) =>{
    await Departamentos.find((error, data)=>{
        if (error) {
            res.json({
                mensaje : "Error al listar los departamentos"
            })
            
        } else {
            res.status(200).json(data);
        }
    });
}



module.exports = {listar};