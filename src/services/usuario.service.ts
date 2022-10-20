import { Usuario, UsuarioSinPass } from '../models/usuario';
import usuariosData from './usuarios.json';

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
    const u = usuarios.filter(x => x.usuario === usuario && x.contrasenia === contraseña);
    return u.map(({ id, rol, usuario }) => {
        return { id, rol, usuario }
    });
}