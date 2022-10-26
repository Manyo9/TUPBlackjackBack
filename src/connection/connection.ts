import * as dotenv from 'dotenv'
dotenv.config();
import * as mysql from 'mysql'

const mysqlConnecction = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT!),
})

mysqlConnecction.connect(err => {
    if(err){
        console.log('Error en db: ', err);
    } else {
        console.log('DB OK')
    }
});