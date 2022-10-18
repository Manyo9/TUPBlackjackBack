import express from 'express';
import * as usuarioServices from '../services/usuario.service';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/', verifyToken, (req: any, res: any) => {
    if (!req.data){
        res.status(401).json({ "ok": false, "mensaje": "Token inválido." });
        return;
    }
    if (req.data.rol == 'admin') {
        res.status(200).json({ "ok": true, "resultado": usuarioServices.getUsuariosSinPass() });
    } else {
        res.status(403).json({ "ok": false, "mensaje": "Usted no tiene los permisos requeridos para acceder a este recurso." });
    }
})

router.get('/:id', verifyToken, (req: any, res: any) => {
    if (!req.data){
        res.status(401).json({ "ok": false, "mensaje": "Token inválido." });
        return;
    }
    if (req.data.id == req.params['id'] || req.data.rol === 'admin') {
        const x = usuarioServices.getById(req.params['id'])
        if (x.length > 0) {
            res.status(200).json({ "ok": true, "resultado": x });
        } else {
            res.status(404).json({ "ok": false, "resultado": [] });
        }
    } else {
        res.status(403).json({ "ok": false, "mensaje": "Usted no tiene los permisos requeridos para acceder a este recurso." });
    }
});

router.post('/iniciarSesion', (req, res) => {
    const { usuario, contrasenia } = req.body;
    let x = usuarioServices.login(usuario, contrasenia);
    if (x.length > 0) {
        let data = JSON.stringify(x[0]);
        const token: string = jwt.sign(data, "blackjacksecretkey");     
        res.status(200).json({
            "ok": true,
            "resultado": token
        });
    } else {
        res.status(200).json({
            "ok": false,
            "mensaje": "Usuario y/o contraseña incorrectos"
        });
    }
});

function verifyToken(req: any, res: any, next: any) {
    if (!req.headers.authorization) return res.status(401).json({ "ok": false, "mensaje": "No autorizado" });
    let token = req.headers.authorization.split(' ')[1];

    if (token === '' || token === null) {
        return res.status(401).json({ "ok": false, "mensaje": "Token vacío" });
    }
    let contenido = jwt.verify(token, 'blackjacksecretkey', (err: any, decoded:any ) => {
        if (err){
            return undefined;
        } else {
            return decoded;
        }
    });
    req.data = contenido;
    next();
}

export default router;