import { Carta } from "./carta";

export class Jugador {
    nombre: string;
    mano: Carta[];
    puntos: number;
    esCroupier: boolean;
    terminoJugada: boolean;
    perdio: boolean;

    constructor (nombre: string, mano: Carta[], puntos: number, esCroupier: boolean, terminoJugada: boolean, perdio: boolean) {
        this.nombre = nombre;
        this.mano = mano;
        this.puntos = puntos;
        this.esCroupier = esCroupier;
        this.terminoJugada = terminoJugada;
        this.perdio = perdio;
    }
}