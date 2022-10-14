import { Usuario } from '../models/usuario';
import usuariosData from './usuarios.json';

const usuarios: Usuario[] = usuariosData;
export const getUsuarios = () => usuarios;