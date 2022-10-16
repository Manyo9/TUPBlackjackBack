import express from 'express';
import cors from 'cors';
import usuariosRouter from './routes/usuarios';
import partidasRouter from './routes/partidas'

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

//RUTAS
app.use('/api/usuarios', usuariosRouter);
app.use('/api/partidas', partidasRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
});