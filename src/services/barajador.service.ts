import { Carta } from "../models/carta";



export function mezclarFisherYates(mazo: Carta[]): void {
  let indice: number = mazo.length
  let rand: number;
  while (indice != 0) {
    rand = Math.floor(Math.random() * indice);
    indice--;

    [mazo[indice], mazo[rand]] = [
      mazo[rand], mazo[indice]];
  }
}
      
export function prepararMazo(): Carta[] {
  let mazo: Carta[] = [];
  for (let p = 0; p < 4; p++) {
    for (let numValor = 1; numValor < 14; numValor++) {
      switch (numValor) {
        case 11:
          mazo.push({
            valorCarta: 'J',
            valorNumerico: 10,
            palo: p + 1
          });
          break;
        case 12:
          mazo.push({
            valorCarta: 'Q',
            valorNumerico: 10,
            palo: p
          });
          break;
        case 13:
          mazo.push({
            valorCarta: 'K',
            valorNumerico: 10,
            palo: p
          });
          break;
        case 1:
          mazo.push({
            valorCarta: 'A',
            valorNumerico: 11,
            palo: p
          });
          break;

        default:
          mazo.push({
            valorCarta: numValor.toString(),
            valorNumerico: numValor,
            palo: p
          });
          break;
      }
    }
  }
  return mazo;
}

export function prepararVariosMazos(n: number): Carta[]{
  let muchosMazos: Carta[] = [];
  for (let i = 0; i < n; i++) {
    muchosMazos = muchosMazos.concat(prepararMazo());
  }
  mezclarFisherYates(muchosMazos);
  return muchosMazos;
}
