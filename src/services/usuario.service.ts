import { Usuario, UsuarioSinPass } from '../models/usuario';
import usuariosData from './usuarios.json';
import mysqlConnecction from '../connection/connection';

const usuarios: Usuario[] = usuariosData;
export const traerUsuarios = () => usuarios;

export const traerUsuariosSinPass = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        mysqlConnecction.query('call spObtenerUsuarios()', (err, res) => {
          if (err) reject(err)
          else resolve(res)
        })
      })
}

export const traerPorId = (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        mysqlConnecction.query('call spObtenerUsuarioPorId(?)', id, (err, res) => {
          if (err) reject(err)
          else resolve(res)
        })
      })
}

export const iniciarSesion = async (usuario: string, contraseña: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        mysqlConnecction.query('call spIniciarSesion(?,?)', [usuario,contraseña], (err, res) => {
          if (err) reject(err)
          else resolve(res)
        })
      })
}