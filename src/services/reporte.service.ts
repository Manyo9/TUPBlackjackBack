import { Usuario, UsuarioSinPass } from '../models/usuario';
import usuariosData from './usuarios.json';
import mysqlConnecction from '../connection/connection';

const usuarios: Usuario[] = usuariosData;
export const traerUsuarios = () => usuarios;

export const obtenerIndiceResultados = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        mysqlConnecction.query('call spIndiceResultados()', (err, res) => {
          if (err) reject(err)
          else resolve(res)
        })
      })
}

export const obtenerPromedioVeintiuno = (): Promise<any> => {
  return new Promise((resolve, reject) => {
      mysqlConnecction.query('call spPromedioVentiuno(@c, @j); select @c as croupier, @j as jugadores;', (err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
    })
}
export const obtenerCantidadVictoriasUsuario = (): Promise<any> => {
  return new Promise((resolve, reject) => {
      mysqlConnecction.query('call spCantidadVictoriasUsuario()', (err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
    })
}

export const obtenerCantidadJuegosJugadores = (): Promise<any> => {
  return new Promise((resolve, reject) => {
      mysqlConnecction.query('call spCantidadJuegosJugadores()', (err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
    })
}
