import { Carta } from "../models/carta";

export class BarajaService {

    mezclarFisherYates(mazo: Carta[]): Carta[] {
        let indice: number = mazo.length
        let rand: number;
        while (indice != 0) {
          rand = Math.floor(Math.random() * indice);
          indice--;

          [mazo[indice], mazo[rand]] = [
            mazo[rand], mazo[indice]];
        }
      
        return mazo;
    }
      
    private prepararMazo(): Carta[] {
        let deck: Carta[] = [];
        for (let p = 0; p < 4; p++) {
            for (let numValor = 1; numValor < 14; numValor++) {
                switch (numValor) {
                    case 11:
                      deck.push({
                        valorCarta: 'J',
                        valorNumerico: 10,
                        palo: p
                      });
                      break;
                    case 12:
                      deck.push({
                        valorCarta: 'Q',
                        valorNumerico: 10,
                        palo: p
                      });
                      break;
                    case 13:
                      deck.push({
                        valorCarta: 'K',
                        valorNumerico: 10,
                        palo: p
                      });
                      break;
                    case 1:
                      deck.push({
                        valorCarta: 'A',
                        valorNumerico: 11,
                        palo: p
                      });
                      break;
              
                    default:
                      deck.push({
                        valorCarta: numValor.toString(),
                        valorNumerico: numValor,
                        palo: p
                      });
                      break;
                  }   
            }
        }
        return deck;
    }

    prepararVariosMazos(n: number): Carta[]{
        let muchosMazos: Carta[] = [];
        for (let i = 0; i < n; i++) {
          muchosMazos.concat(this.prepararMazo());
        }
        let mazoFinal: Carta[] = this.mezclarFisherYates(muchosMazos);
        return mazoFinal;
    }
}