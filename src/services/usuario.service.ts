import { Usuario, UsuarioSinPass } from '../models/usuario';
import usuariosData from './usuarios.json';
import mysqlConnecction from '../connection/connection';

const usuarios: Usuario[] = usuariosData;
export const traerUsuarios = () => usuarios;

export const traerUsuariosSinPass = (): UsuarioSinPass[] => {
    return usuarios.map(({ id, rol, usuario }) => {
        return { id, rol, usuario }
    });
}

export const traerPorId = (id: number): UsuarioSinPass[] => {
    const u = usuarios.filter(x => x.id == id);
    return u.map(({ id, rol, usuario }) => {
        return { id, rol, usuario }
    });
}

export const iniciarSesion = async (usuario: string, contraseña: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        mysqlConnecction.query('call spIniciarSesion(?,?)', [usuario,contraseña], (err, res) => {
          if (err) reject(err)
          else resolve(res)
        })
      })
}