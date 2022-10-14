import express from 'express';
import usuariosRouter from './routes/usuarios';

const app = express();
app.use(express.json());

const PORT = 3000;

//RUTAS
app.use('/api/usuarios', usuariosRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
});