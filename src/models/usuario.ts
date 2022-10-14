export class Usuario {
    id: number;
    rol: string;
    usuario: string;
    contrasenia: string;
}

export type UsuarioSinPass = Omit<Usuario, 'contrasenia'>;