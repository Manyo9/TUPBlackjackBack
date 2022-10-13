const express = require('express');
const app = require('../../app');
const router = express.Router();
const jwt = require('jsonwebtoken');

/*router.post('/iniciarSesion', (req, res) => {
    const {usuario, contrasenia} = req.body;

    // Acá implementar service
    /*(err,rows,fields) => {
        if(!err){
            if(rows.length > 0){
                let data = JSON.stringify(rows[0]);
                const token = jwt.sign(data, 'secret');
                res.status(200).json({"ok":true,
                "resultado":[token]});
            } else {
                res.status(200).json({"ok":false,
                "mensaje":"Usuario y/o contraseña incorrectos"});
            }
        } else {
            console.log(err);
        }
}*/

function verifyToken(req, res, next){
    if(!req.headers.authorization) return res.status(401).json({"ok":false,"mensaje":"No autorizado"});
    let token = req.headers.authorization.split(' ')[1];

    if(token === '' || token === null){
        return res.status(401).json({"ok":false,"mensaje":"Token inválido"});
    }
        let contenido = jwt.verify(token,'blackjacksecreto');
        req.data = contenido;
        next();
}

module.exports = router;