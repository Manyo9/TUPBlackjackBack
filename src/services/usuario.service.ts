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

export const iniciarSesion = (usuario: string, contraseña: string): UsuarioSinPass[] => {
    // const u = usuarios.filter(x => x.usuario === usuario && x.contrasenia === contraseña);
    mysqlConnecction.query('call sp_IniciarSesion(?,?)', [usuario,contraseña], 
    (err,rows,fields) => {
        if(!err){
            if(rows.length > 0){
                let data = JSON.stringify(rows[0]);
                return data;
            } else {
                return [];
            }
        } else {
            console.log(err);
            return [];
        }
    })
    return [];
    // return u.map(({ id, rol, usuario }) => {
    //     return { id, rol, usuario }
    // });
}