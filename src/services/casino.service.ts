import { Carta } from '../models/carta';
import { CroupierDTO, Jugador } from '../models/jugador';
import { Partida, PartidaDTO } from '../models/partida';

export class CasinoService {
    private static _instancia: CasinoService;
    partidas: Partida[] = [];

    private constructor() { }

    public static getInstancia(): CasinoService {
        if (!this._instancia) {
            this._instancia = new this();
            return this._instancia;
        } else {
            return this._instancia;
        }
    }

    getPartidas = (): PartidaDTO[] => this.partidas;

    getById = (id: number): PartidaDTO[] => {
        const p = this.partidas.filter(p => p.idPartida == id)
        return p.map(({ idPartida, jugador, croupier, empezo, turnoCroupier, terminoJuego }) => {
            return { idPartida, jugador, croupier, empezo, turnoCroupier, terminoJuego }
        })
    }

    newPartida = (idJugador: number, nombre: string): number => {
        let partida = new Partida(
            this.partidas.length + 1,
            [],
            new Jugador(idJugador, nombre, [], 0, false, false, false),
            new Jugador(0, 'Croupier', [], 0, true, false, false)
        )
        partida.generarMazo(1);
        partida.empezar();
        this.partidas.push(partida);
        return partida.idPartida;
    }

    terminarPartida(id: number): boolean {
        const indice = this.partidas.findIndex(p => { return p.idPartida == id });
        if (indice == -1) {
            return false;
        } else {
            this.partidas[indice].terminoJuego = true;
            return true;
        }
    }

    pedirCarta(id: number): Carta | undefined {
        const indice = this.partidas.findIndex(p => { return p.idPartida == id && p.jugador.terminoJugada == false });
        if (indice == -1) {
            return undefined;
        }
        return this.partidas[indice].getUnaCarta();
    }

    plantarJugador(id: number): boolean {
        const indice = this.partidas.findIndex(p => { return p.idPartida == id });
        if (indice == -1) {
            return false;
        } else {
            this.partidas[indice].plantarse();
            return true;
        }
    }

    generarJugadaCroupier(id: number): CroupierDTO[] | undefined {
        const indice = this.partidas.findIndex(p => { return p.idPartida == id });
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
}
