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

  getUnaCarta = (): any => {
    let c;
    if (this.mazo.length > 0) {
      c = this.mazo.pop();
    } else {
      this.generarMazo(2);
      c = this.mazo.pop();
    }
    return c;
  }

  empezar = (): void => { this.empezo = true}

  generarMazo = (n: number): void => { this.mazo = barajador.prepararVariosMazos(n); }

  plantarse = (): void => { this.jugador.plantar(); }

  mezclar = (): void => { barajador.mezclarFisherYates(this.mazo); }

  tieneBlackjack = (jugador: Jugador): boolean => jugador.puntos === 21 && jugador.mano.length === 2

  generarJugadaCroupier() {
    this.turnoCroupier = true;
    while (!this.croupier.terminoJugada) {
      this.croupier.agregarCarta(this.getUnaCarta());
    }
  }

  determinarGanador(): any {
    if (!this.jugador.perdio && this.croupier.perdio) {
      //gano jugador porque se pasó el croupier
      return { idGanador: this.jugador.usuarioId, razon: "Croupier se pasó" }

    } else if (this.jugador.perdio && !this.croupier.perdio) {
      //gano croupier porque se pasó el jugador
      return { idGanador: this.croupier.usuarioId, razon: "Jugador se pasó" }

    } else if (!this.jugador.perdio && !this.croupier.perdio) {
      //ninguno se pasó
      // chequeo de blackjack
      if (this.jugador.puntos == this.croupier.puntos) {
        //igual puntaje
        if (this.tieneBlackjack(this.jugador) && !this.tieneBlackjack(this.croupier)) {
          //gana jugador por blackjack
          return { idGanador: this.jugador.usuarioId, razon: "Jugador tiene blackjack" }
        } else if (!this.tieneBlackjack(this.jugador) && this.tieneBlackjack(this.croupier)) {
          // gana croupier por blackjack
          return { idGanador: this.croupier.usuarioId, razon: "Croupier tiene blackjack" }
        } else {
          //empate
          return { idGanador: -1, razon: "Igualdad de puntos" }
        }
      } else if (this.jugador.puntos > this.croupier.puntos) {
        //gana jugador por mayor puntaje
        return { idGanador: this.jugador.usuarioId, razon: "Jugador tiene mayor puntaje" }
      } else {
        //gana croupier por mayor puntaje
        return { idGanador: this.croupier.usuarioId, razon: "Croupier tiene mayor puntaje" }
      }

    } else {
      // Empate ya que ambos se pasaron
      return { idGanador: -1, razon: "Ambos se pasaron" }
    }
  }
}

export type PartidaDTO = Pick<Partida, 'idPartida' | 'jugador' | 'croupier' | 'empezo' | 'turnoCroupier' | 'terminoJuego'>;