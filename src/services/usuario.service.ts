import { Usuario, UsuarioSinPass } from '../models/usuario';
import usuariosData from './usuarios.json';

const usuarios: Usuario[] = usuariosData;
export const getUsuarios = () => usuarios;

export const getUsuariosSinPass = (): UsuarioSinPass[] => {
    return usuarios.map(({ id, rol, usuario }) => {
        return { id, rol, usuario }
    });
}

export const getById = (id: number): UsuarioSinPass[] => {
    const u = usuarios.filter(x => x.id == id);
    return u.map(({ id, rol, usuario }) => {
        return { id, rol, usuario }
    });
}

export const login = (usu: string, cont: string): UsuarioSinPass[] => {
    const u = usuarios.filter(x => x.usuario === usu && x.contrasenia === cont);
    return u.map(({ id, rol, usuario }) => {
        return { id, rol, usuario }
    });
}