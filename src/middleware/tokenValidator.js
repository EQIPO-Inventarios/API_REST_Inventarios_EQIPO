const jwt = require('jsonwebtoken');
const express = require('express');
const rutasProtegidas = express.Router(); 

rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];
 
    if (token) {
      jwt.verify(token, String(rutasProtegidas.get('llave')), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida', err });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 });


 const generateToken = (usuario) =>{
    const payload = {
        check:  true,
        user : usuario
       };
       const token = jwt.sign(payload, String(rutasProtegidas.get('key')), {
        expiresIn: '24h' //24horas        
       });       

       return  token
       
 }

 module.exports = {rutasProtegidas, generateToken}