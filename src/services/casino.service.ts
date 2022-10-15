import { Carta } from '../models/carta';
import { Jugador } from '../models/jugador';
import { Partida } from '../models/partida';

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

    getPartidas = (): Partida[] => this.partidas;

    getById = (id: number): Partida | undefined => this.partidas.find(p => p.idPartida == id)

    newPartida = (idJugador: number, nombre: string): number => {
        let partida = new Partida(
            this.partidas.length + 1,
            [],
            new Jugador(idJugador, nombre, [], 0, false, false, false),
            new Jugador(0, 'Croupier', [], 0, true, false, false)
        )
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
        const indice = this.partidas.findIndex(p => { return p.idPartida == id && p.turnoCroupier == false});
        if (indice == -1) {
            return undefined;
        }
        let c = this.partidas[indice].getUnaCarta();
        return c;

    }
}
