import { Carta } from '../models/carta';
import { CroupierDTO, Jugador } from '../models/jugador';
import { Partida, PartidaDTO } from '../models/partida';
import mysqlConnecction from '../connection/connection';
export class CasinoService {
    private static _instancia: CasinoService;
    partidas: Partida[] = [];

    private constructor() { }

    public static obtenerInstancia(): CasinoService {
        if (!this._instancia) {
            this._instancia = new this();
            return this._instancia;
        } else {
            return this._instancia;
        }
    }

    traerPartidas = (): PartidaDTO[] => this.partidas;

    traerPorId = (id: number): PartidaDTO[] => {
        const p = this.partidas.filter(p => p.idPartida == id)
        return p.map(({ idPartida, jugador, croupier, activo, turnoCroupier }) => {
            return { idPartida, jugador, croupier, activo, turnoCroupier }
        })
    }

    nuevaPartida =  (idJugador: number, nombre: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            mysqlConnecction.query('INSERT INTO partidas (idUsuario) VALUES (?); SELECT last_insert_id() as id;', [idJugador], (err, res) => {
                console.log(res[1][0].id);
                let partida = new Partida(
                    res[1][0].id,
                    [],
                    new Jugador(idJugador, nombre, [], 0, false, false, false),
                    new Jugador(0, 'Croupier', [], 0, true, false, false)
                )
                partida.generarMazo(1);
                partida.empezar();
                this.partidas.push(partida);
                if (err) reject(err)
                else resolve(res[1][0].id)
            })
        })
        
    
    }

    pedirCarta(id: number): Carta | undefined {
        const indice = this.partidas.findIndex(p => p.idPartida == id && p.jugador.terminoJugada == false);
        if (indice == -1) {
            return undefined;
        }
        return this.partidas[indice].tomarCartaJugador();
    }

    plantarJugador(id: number): boolean {
        const indice = this.partidas.findIndex(p => p.idPartida == id);
        if (indice == -1) {
            return false;
        } else {
            this.partidas[indice].plantarse();
            return true;
        }
    }

    obtenerPrimeraCroupier(id: number): Carta | undefined {
        const indice = this.partidas.findIndex(p => p.idPartida == id);
        if (indice == -1) {
            return undefined;
        }
        const c = this.partidas[indice].obtenerPrimeraCroupier();
        return c;
    }

    generarJugadaCroupier(id: number): CroupierDTO[] | undefined {
        const indice = this.partidas.findIndex(p => p.idPartida == id);
        if (indice == -1) {
            return undefined;
        }

        this.partidas[indice].generarJugadaCroupier();
        const p = this.partidas.filter(p => p.idPartida == id)
        const c: CroupierDTO[] = [p[0].croupier];
        return c.map(({ mano, puntos, perdio }) => {
            return { mano, puntos, perdio }
        })
    }

    jugarNuevaRonda(id: number): PartidaDTO[] | undefined {
        const indice = this.partidas.findIndex(p => p.idPartida == id);
        if (indice == -1) {
            return undefined;
        }

        this.partidas[indice].nuevaRonda();
        return this.traerPorId(id);
    }

    terminarPartida(id: number): boolean {
        const indice = this.partidas.findIndex(p => p.idPartida == id);
        if (indice == -1) {
            return false;
        }

        this.partidas[indice].terminar();
        return true;
    }

    obtenerGanador(id: number): any {
        const indice = this.partidas.findIndex(p => p.idPartida == id);
        if (indice == -1) {
            return false;
        }
        const partida = this.partidas[indice];
        const ganador = partida.determinarGanador();   
        let idEstadoGanador: number;
        if (ganador.idGanador > 0) {
            idEstadoGanador = 3;
        } else if (ganador.idGanador == 0) {
            idEstadoGanador = 2;
        } else {
            idEstadoGanador = 1;
        }
        mysqlConnecction.query('INSERT INTO resultados (idPartida, idEstadoGanador, puntajeCroupier, puntajeJugador, fechaFinalizacion) VALUES (?,?,?,?,?); SELECT last_insert_id() as id;', 
        [partida.idPartida, idEstadoGanador, partida.croupier.puntos, partida.jugador.puntos, new Date()], (err, res) => {
        }) 
        return ganador;
    }

    buscarPartidaActiva(idUsuario: number): PartidaDTO[] | undefined {
        const indice = this.partidas.findIndex(p => p.jugador.usuarioId == idUsuario && p.activo);
        if (indice == -1) {
            return undefined;
        }

        return this.traerPorId(this.partidas[indice].idPartida)
    }

    chequearUsuarioPartida(idPartida: number, idUsuario: number): boolean {
        const indice = this.partidas.findIndex(p => p.idPartida == idPartida && p.jugador.usuarioId == idUsuario);
        if (indice == -1) {
            return false;
        } else {
            return true;
        }
    }
}
