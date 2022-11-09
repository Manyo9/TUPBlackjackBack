import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import * as reporteService from '../services/reporte.service';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/indiceResultados', verifyToken, (req: any, res: any) => {
    if (!req.data) {
        res.status(401).json({ "ok": false, "mensaje": "Token inválido." });
        return;
    }
    if (req.data.rol == 'admin') {
        reporteService.obtenerIndiceResultados()
        .catch((e) => {
            res.status(500).json({
                "ok": false,
                "mensaje": "Error en la db"
            });
            console.error(e);
        })
        .then((x) => {
            x = x[0];
            res.status(200).json({ "ok": true, "resultado": x });
        })
        
    } else {
        res.status(403).json({ "ok": false, "mensaje": "Usted no tiene los permisos requeridos para acceder a este recurso." });
    }
})

function verifyToken(req: any, res: any, next: any) {
    if (!req.headers.authorization) return res.status(401).json({ "ok": false, "mensaje": "No autorizado" });
    let token = req.headers.authorization.split(' ')[1];

    if (token === '' || token === null) {
        return res.status(401).json({ "ok": false, "mensaje": "Token vacío" });
    }
    let contenido = jwt.verify(token, process.env.SECRET_KEY as string, (err: any, decoded: any) => {
        if (err) {
            return undefined;
        } else {
            return decoded;
        }
    });
    req.data = contenido;
    next();
}

export default router;