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

    agregarCarta(carta: Carta): void{
        this.mano.push(carta);
        this.chequearCondicion();
        this.puntos = this.calcularPuntos();
    }

    calcularPuntos(): number{
        let acumulador: number = 0;
        this.mano.forEach(carta => {
            acumulador += carta.valorNumerico; 
        });
        return acumulador;
    }

    chequearPlantadoForzado() : boolean {
        if(this.esCroupier){
            return this.calcularPuntos() > 16;
        } else {
            return this.calcularPuntos() === 21;
        }
    }

    chequearCondicion(): void {
        if(this.calcularPuntos() > 21){
          for (let carta of this.mano) {
            if (carta.valorNumerico === 11){
                carta.valorNumerico = 1;
                this.terminoJugada = this.chequearPlantadoForzado();  //Failsafe por si la ultima carta pedida es un as
                return;
              }    
            }
            this.perdio = true;
            this.terminoJugada = true;
        } else if (this.chequearPlantadoForzado()) {
            this.terminoJugada = true;
        }
    }

    plantar(): void {
        this.terminoJugada = true;
    }

    reiniciarJugador(): void {
        this.terminoJugada = false;
        this.perdio = false;
        this.puntos = 0;
        this.mano = [];
    }
}

export type CroupierDTO = Pick<Jugador, 'mano' | 'puntos' | 'perdio' >;