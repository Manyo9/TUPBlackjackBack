import express, { Express } from 'express';
import { BodyParser } from 'body-parser';
import cors from 'cors';

const app: Express = express();
const bodyParser: BodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// RUTAS
const userRoute = require('./api/routes/usuario');
app.use('/usuarios',userRoute);

module.exports = app;