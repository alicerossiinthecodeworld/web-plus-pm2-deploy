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

// Настройка CORS для всех маршрутов
app.use(cors({
  origin: 'https://mestoalice.nomorepartiesco.ru', // Укажите точный домен вашего фронтенда
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'], // Все поддерживаемые методы
  allowedHeaders: ['Authorization', 'Content-Type'], // Заголовки, которые клиент может отправлять
  credentials: true, // Разрешение для куки
}));

// Обработка preflight-запросов (OPTIONS)
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', 'https://mestoalice.nomorepartiesco.ru');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization,Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(204); // Успешный ответ для preflight-запросов
  }
  next();
});

// Middleware для обработки JSON и form-data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware для работы с куки
app.use(cookieParser());

// Подключение маршрутов приложения
app.use(routes);

// Обработка ошибок celebrate
app.use(errors());

// Общий обработчик ошибок
app.use(errorHandler);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
