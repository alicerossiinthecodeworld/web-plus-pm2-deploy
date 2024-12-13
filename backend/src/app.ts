import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import errorHandler from './middlewares/error-handler';
import { DB_ADDRESS } from './config';
import routes from './routes';

// Настройка переменных окружения
require('dotenv').config();
const { PORT = 3000 } = process.env;

// Создание приложения Express
const app = express();

// Подключение к MongoDB
mongoose.connect(DB_ADDRESS);

app.enableCors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
});


// Middleware для обработки тела запросов
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware для работы с куки
app.use(cookieParser());

// Подключение маршрутов
app.use(routes);

// Обработка ошибок celebrate
app.use(errors());

// Общий обработчик ошибок
app.use(errorHandler);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
