import { Carta } from "./carta";

export class Jugador {
    usuarioId: number;
    nombre: string;
    mano: Carta[];
    puntos: number;
    esCroupier: boolean;
    terminoJugada: boolean;
    perdio: boolean;

    constructor (usuarioId:number, nombre: string, mano: Carta[], puntos: number, esCroupier: boolean, terminoJugada: boolean, perdio: boolean) {
        this.usuarioId = usuarioId
        this.nombre = nombre;
        this.mano = mano;
        this.puntos = puntos;
        this.esCroupier = esCroupier;
        this.terminoJugada = terminoJugada;
        this.perdio = perdio;
    }
}