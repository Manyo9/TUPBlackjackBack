import { BarajadorService } from "../services/barajador.service";
import { Carta } from "./carta";
import { Jugador } from "./jugador";

export class Partida {
    idPartida: number;
    mazo: Carta[];
    jugador: Jugador;
    croupier: Jugador;
    empezo: boolean = false;
    turnoCroupier: boolean = false;
    terminoJuego: boolean = false;
    barajador: BarajadorService; //arreglar

    getMazo = (): Carta[] => this.mazo;

    getUnaCarta = (): Carta | undefined => this.mazo.pop();

    generateMazo = (n: number): void => {this.mazo = this.barajador.prepararVariosMazos(n);}

    mezclar = () : void => {this.mazo = this.barajador.mezclarFisherYates(this.mazo);}

    tieneBlackjack = (jugador: Jugador): boolean => jugador.puntos === 21 && jugador.mano.length === 2

    determinarGanador(jugador: Jugador, croupier: Jugador): any {
        if (!jugador.perdio && croupier.perdio) {
            //gano jugador porque se pasó el croupier
            return {idGanador: jugador.usuarioId, razon: "Croupier se pasó"}
      
          } else if (jugador.perdio && !croupier.perdio) {
            //gano croupier porque se pasó el jugador
            return {idGanador: croupier.usuarioId, razon: "Jugador se pasó"}

          } else if (!jugador.perdio && !croupier.perdio) {
            //ninguno se pasó
            // chequeo de blackjack
            if (jugador.puntos == croupier.puntos) {
              //igual puntaje
              if (this.tieneBlackjack(jugador) && !this.tieneBlackjack(croupier)) {
                //gana jugador por blackjack
                return {idGanador: jugador.usuarioId, razon: "Jugador tiene blackjack"}
              } else if (!this.tieneBlackjack(jugador) && this.tieneBlackjack(croupier)) {
                // gana croupier por blackjack
                return {idGanador: croupier.usuarioId, razon: "Croupier tiene blackjack"}
              } else {
                //empate
                return {idGanador: -1, razon: "Igualdad de puntos"}
              }
            } else if (jugador.puntos > croupier.puntos) {
              //gana jugador por mayor puntaje
              return {idGanador: jugador.usuarioId, razon: "Jugador tiene mayor puntaje"}
            } else {
              //gana croupier por mayor puntaje
              return {idGanador: croupier.usuarioId, razon: "Croupier tiene mayor puntaje"}
            }
      
          } else {
            // Empate ya que ambos se pasaron
            return {idGanador: -1, razon: "Ambos se pasaron"}
        }
    }
}