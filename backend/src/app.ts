import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import errorHandler from './middlewares/error-handler';
import { DB_ADDRESS } from './config';
import routes from './routes';

require('dotenv').config();
const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect(DB_ADDRESS);

app.use(cors({
  origin: 'https://mestoalice.nomorepartiesco.ru', // Укажите ваш фронтенд-домен
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => console.log('ok'));
