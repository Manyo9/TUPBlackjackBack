import express from 'express';
import { CasinoService } from '../services/casino.service';
import jwt from 'jsonwebtoken';

const router = express.Router();

const casinoService: CasinoService = CasinoService.getInstancia();

router.get('/', verifyToken, (req: any, res: any) => {
    if (!req.data) {
        res.status(401).json({ "ok": false, "mensaje": "Token inválido." });
        return;
    }
    if (req.data.rol == 'admin') {
        res.status(200).json({ "ok": true, "resultado": casinoService.getPartidas() });
    } else {
        res.status(403).json({ "ok": false, "mensaje": "Usted no tiene los permisos requeridos para acceder a este recurso." });
    }
});

router.get('/porId/:id', verifyToken, (req: any, res: any) => {
    if (!req.data) {
        res.status(401).json({ "ok": false, "mensaje": "Token inválido." });
        return;
    }

    const x = casinoService.getById(req.params['id'])
    if (x.length > 0) {
        res.status(200).json({ "ok": true, "resultado": x[0] });
    } else {
        res.status(404).json({ "ok": false, "mensaje": `No se encontró la partida con el id ${req.params['id']}` });
    }
});

router.post('/nueva', verifyToken, (req: any, res: any) => {
    if (!req.data) {
        res.status(401).json({ "ok": false, "mensaje": "Token inválido." });
        return;
    }

    const id = req.data.id;
    const nombre = req.data.usuario;
    const partidaId = casinoService.newPartida(id, nombre);
    const partida = casinoService.getById(partidaId);
    if (partida.length > 0) {
        res.status(200).json({ "ok": true, "mensaje": `Creada con éxito con id ${partidaId}`, "resultado": partida[0] });
    } else {
        res.status(500).json({ "ok": false, "mensaje": `Error al crear partida` });
    }

});

router.get('/:id/pedirCarta', verifyToken, (req: any, res: any) => {
    if (!req.data) {
        res.status(401).json({ "ok": false, "mensaje": "Token inválido." });
        return;
    }

    const id = req.params['id'];
    const carta = casinoService.pedirCarta(id);
    if (carta) {
        res.status(200).json({ "ok": true, "resultado": carta });
    } else {
        res.status(404).json({ "ok": false, "mensaje": `No se encontró la partida con el id ${req.params['id']}` });
    }
});

router.post('/:id/plantarse', verifyToken, (req: any, res: any) => {
    if (!req.data) {
        res.status(401).json({ "ok": false, "mensaje": "Token inválido." });
        return;
    }

    const id = req.params['id'];
    const exito = casinoService.plantarJugador(id);
    if (exito) {
        res.status(200).json({ "ok": true, "mensaje": "Te plantaste con éxito" });
    } else {
        res.status(404).json({ "ok": false, "mensaje": `No se encontró la partida con el id ${req.params['id']}` });
    }
});

router.get('/:id/jugadaCroupier', verifyToken, (req: any, res: any) => {
    if (!req.data) {
        res.status(401).json({ "ok": false, "mensaje": "Token inválido." });
        return;
    }

    const id = req.params['id'];
    const croupier = casinoService.generarJugadaCroupier(id);
    if (croupier && croupier.length > 0) {
        res.status(200).json({ "ok": true, "resultado": croupier[0] });
    } else {
        res.status(404).json({ "ok": false, "mensaje": `No se encontró la partida con el id ${req.params['id']}` });
    }
});

router.get('/:id/primeraCartaCroupier', verifyToken, (req: any, res: any) => {
    if (!req.data) {
        res.status(401).json({ "ok": false, "mensaje": "Token inválido." });
        return;
    }

    const id = req.params['id'];
    const carta = casinoService.obtenerPrimeraCroupier(id);
    if (carta) {
        res.status(200).json({ "ok": true, "resultado": carta });
    } else {
        res.status(404).json({ "ok": false, "mensaje": `No se encontró la partida con el id ${req.params['id']}` });
    }
});

router.post('/:id/nuevaRonda', verifyToken, (req: any, res: any) => {
    if (!req.data) {
        res.status(401).json({ "ok": false, "mensaje": "Token inválido." });
        return;
    }

    const id = req.params['id'];
    const partida = casinoService.jugarNuevaRonda(id);
    if (partida && partida.length > 0) {
        res.status(200).json({ "ok": true, "resultado": partida[0] });
    } else {
        res.status(404).json({ "ok": false, "mensaje": `No se encontró la partida con el id ${req.params['id']}` });
    }
});

router.post('/:id/terminarPartida', verifyToken, (req: any, res: any) => {
    if (!req.data) {
        res.status(401).json({ "ok": false, "mensaje": "Token inválido." });
        return;
    }

    const id = req.params['id'];
    const exito = casinoService.terminarPartida(id);
    if (exito) {
        res.status(200).json({ "ok": true, "mensaje": "Gracias por jugar!" });
    } else {
        res.status(404).json({ "ok": false, "mensaje": `No se encontró la partida con el id ${req.params['id']}` });
    }
});

router.get('/:id/obtenerGanador', verifyToken, (req: any, res: any) => {
    if (!req.data) {
        res.status(401).json({ "ok": false, "mensaje": "Token inválido." });
        return;
    }

    const id = req.params['id'];
    const resultado = casinoService.obtenerGanador(id);
    if (resultado) {
        res.status(200).json({ "ok": true, "resultado": resultado });
    } else {
        res.status(404).json({ "ok": false, "mensaje": `No se encontró la partida con el id ${req.params['id']}` });
    }
});

router.get('/partidaActiva', verifyToken, (req: any, res: any) => {
    if (!req.data) {
        res.status(401).json({ "ok": false, "mensaje": "Token inválido." });
        return;
    }

    const resultado = casinoService.getPartidaActiva(req.data.id);
    if (resultado && resultado.length > 0) {
        res.status(200).json({ "ok": true, "resultado": resultado[0] });
    } else {
        res.status(404).json({ "ok": false, "mensaje": `El usuario no tiene partida activa.` });
    }
});

function verifyToken(req: any, res: any, next: any) {
    if (!req.headers.authorization) return res.status(401).json({ "ok": false, "mensaje": "No autorizado" });
    let token = req.headers.authorization.split(' ')[1];

    if (token === '' || token === null) {
        return res.status(401).json({ "ok": false, "mensaje": "Token vacío" });
    }
    let contenido = jwt.verify(token, 'blackjacksecretkey', (err: any, decoded: any) => {
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