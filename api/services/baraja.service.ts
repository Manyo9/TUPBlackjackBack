import { Carta } from "../models/carta";

export class BarajaService {
    prepararMazo(): Carta[] {
        let mazo: Carta[];
        for (let palo = 0; palo < 4; palo++) {
            for (let numValor = 1; numValor < 14; numValor++) {
                switch (numValor) {
                    case 11:
                      stringValor = 'J';
                      puntosCarta = 10;
                      break;
                    case 12:
                      stringValor = 'Q';
                      puntosCarta = 10;
                      break;
                    case 13:
                      stringValor = 'K';
                      puntosCarta = 10;
                      break;
                    case 1:
                      stringValor = 'A';
                      puntosCarta = 11;
                      break;
              
                    default:
                      stringValor = numValor.toString();
                      puntosCarta = numValor;
                      break;
                  }   
            }
        }
    }
}  