import mysqlConnecction from '../connection/connection';


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