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
