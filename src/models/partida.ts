import * as barajador from "../services/barajador.service";
import { Carta } from "./carta";
import { Jugador } from "./jugador";

export class Partida {
  idPartida: number;
  mazo: Carta[];
  jugador: Jugador;
  croupier: Jugador;
  empezo: boolean;
  turnoCroupier: boolean;
  terminoJuego: boolean;


  constructor(
    idPartida: number,
    mazo: Carta[],
    jugador: Jugador,
    croupier: Jugador,
  ) {
    this.idPartida = idPartida;
    this.mazo = mazo;
    this.jugador = jugador;
    this.croupier = croupier;
    this.empezo = false;
    this.turnoCroupier = false;
    this.terminoJuego = false;
  }

  getMazo = (): Carta[] => this.mazo;

  getUnaCarta = (): Carta | undefined => this.mazo.pop();

  generarMazo(n: number): void {
    this.mazo = barajador.prepararVariosMazos(n);
  }

  mezclar = (): void => { barajador.mezclarFisherYates(this.mazo); }

  tieneBlackjack = (jugador: Jugador): boolean => jugador.puntos === 21 && jugador.mano.length === 2

  determinarGanador(jugador: Jugador, croupier: Jugador): any {
    if (!jugador.perdio && croupier.perdio) {
      //gano jugador porque se pasó el croupier
      return { idGanador: jugador.usuarioId, razon: "Croupier se pasó" }

    } else if (jugador.perdio && !croupier.perdio) {
      //gano croupier porque se pasó el jugador
      return { idGanador: croupier.usuarioId, razon: "Jugador se pasó" }

    } else if (!jugador.perdio && !croupier.perdio) {
      //ninguno se pasó
      // chequeo de blackjack
      if (jugador.puntos == croupier.puntos) {
        //igual puntaje
        if (this.tieneBlackjack(jugador) && !this.tieneBlackjack(croupier)) {
          //gana jugador por blackjack
          return { idGanador: jugador.usuarioId, razon: "Jugador tiene blackjack" }
        } else if (!this.tieneBlackjack(jugador) && this.tieneBlackjack(croupier)) {
          // gana croupier por blackjack
          return { idGanador: croupier.usuarioId, razon: "Croupier tiene blackjack" }
        } else {
          //empate
          return { idGanador: -1, razon: "Igualdad de puntos" }
        }
      } else if (jugador.puntos > croupier.puntos) {
        //gana jugador por mayor puntaje
        return { idGanador: jugador.usuarioId, razon: "Jugador tiene mayor puntaje" }
      } else {
        //gana croupier por mayor puntaje
        return { idGanador: croupier.usuarioId, razon: "Croupier tiene mayor puntaje" }
      }

    } else {
      // Empate ya que ambos se pasaron
      return { idGanador: -1, razon: "Ambos se pasaron" }
    }
  }
}

export type PartidaDTO = Pick<Partida, 'idPartida' | 'jugador'| 'croupier'| 'empezo' | 'turnoCroupier'| 'terminoJuego'>;