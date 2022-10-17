import express from 'express';
import { CasinoService } from '../services/casino.service';
import jwt from 'jsonwebtoken';

const router = express.Router();

const casinoService: CasinoService = CasinoService.getInstancia();

router.get('/', verifyToken, (req: any, res: any) => {
    if (req.data[0].rol == 'admin') {
        res.status(200).json({ "ok": true, "resultado": casinoService.getPartidas() });
    } else {
        res.status(403).json({ "ok": false, "mensaje": "Usted no tiene los permisos requeridos para acceder a este recurso." });
    }
})

router.get('/:id', (req: any, res: any) => {
    const x = casinoService.getById(req.params['id'])
    if (x.length > 0) {
        res.status(200).json({ "ok": true, "resultado": x[0] });
    } else {
        res.status(404).json({ "ok": false, "mensaje": `No se encontró la partida con el id ${req.params['id']}` });
    }
});

router.post('/nueva', verifyToken, (req: any, res: any) => {
    const id = req.data[0].id;
    const n = req.data[0].usuario;
    const partidaId = casinoService.newPartida(id, n);
    const x = casinoService.getById(partidaId);
    if(x.length > 0){
        res.status(200).json({ "ok": true, "mensaje": `Creada con éxito con id ${partidaId}`, "resultado":x[0]});
    } else {
        res.status(500).json({ "ok": false, "mensaje": `Error al crear partida`});
    }
    
});

router.post('/:id/terminar', (req: any, res: any) => {
    const id = req.params['id'];
    const bool = casinoService.terminarPartida(id);
    if (bool) {
        res.status(200).json({ "ok": true, "mensaje": `Se terminó la partida con ${req.params['id']}` });
    } else {
        res.status(404).json({ "ok": false, "mensaje": `No se encontró la partida con el id ${req.params['id']}` });
    }

});

router.get('/:id/pedirCarta', (req: any, res: any) => {
    const id = req.params['id'];
    const carta = casinoService.pedirCarta(id);
    if (carta) {
        res.status(200).json({ "ok": true, "resultado": carta });
    } else {
        res.status(404).json({ "ok": false, "mensaje": `No se encontró la partida con el id ${req.params['id']}` });
    }
});

router.post('/:id/plantarse', (req: any, res: any) => {
    const id = req.params['id'];
    const b = casinoService.plantarJugador(id);
    if (b) {
        res.status(200).json({ "ok": true, "mensaje": "Te plantaste con éxito"});
    } else {
        res.status(404).json({ "ok": false, "mensaje": `No se encontró la partida con el id ${req.params['id']}` });
    }
});

router.get('/:id/jugadaCroupier', (req: any, res: any) => {
    const id = req.params['id'];
    const c = casinoService.generarJugadaCroupier(id);
    if (c) {
        res.status(200).json({ "ok": true, "resultado": c[0]});
    } else {
        res.status(404).json({ "ok": false, "mensaje": `No se encontró la partida con el id ${req.params['id']}` });
    }
});

router.get('/:id/primeraCartaCroupier', (req: any, res: any) => {
    const id = req.params['id'];
    const c = casinoService.obtenerPrimeraCroupier(id);
    if (c) {
        res.status(200).json({ "ok": true, "resultado": c});
    } else {
        res.status(404).json({ "ok": false, "mensaje": `No se encontró la partida con el id ${req.params['id']}` });
    }
});

function verifyToken(req: any, res: any, next: any) {
    if (!req.headers.authorization) return res.status(401).json({ "ok": false, "mensaje": "No autorizado" });
    let token = req.headers.authorization.split(' ')[1];

    if (token === '' || token === null) {
        return res.status(401).json({ "ok": false, "mensaje": "Token inválido" });
    }
    let contenido = jwt.verify(token, 'blackjacksecretkey'); // aprender como manejar si se pasa un token invalido
    req.data = contenido;
    next();
}

export default router;