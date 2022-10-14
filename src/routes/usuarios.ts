import express from 'express';
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/iniciarSesion', (req, res) => {
    //const {usuario, contrasenia} = req.body;
})

function verifyToken(req: any, res: any, next: any){
    if(!req.headers.authorization) return res.status(401).json({"ok":false,"mensaje":"No autorizado"});
    let token = req.headers.authorization.split(' ')[1];

    if(token === '' || token === null){
        return res.status(401).json({"ok":false,"mensaje":"Token inválido"});
    }
        let contenido = jwt.verify(token,'secretkey'); // aprender como manejar si se pasa un token invalido
        req.data = contenido;
        next();
}

module.exports = router;