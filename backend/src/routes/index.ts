import {
  Router, Request, Response, NextFunction,
} from 'express';
import userRouter from './users';
import cardRouter from './cards';
import auth from '../middlewares/auth';
import NotFoundError from '../errors/not-found-error';
import {
  createUser, login,
} from '../controllers/users';
import { validateUserBody, validateAuthentication } from '../middlewares/validatons';

const router = Router();
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/signup', validateUserBody, asyncHandler(createUser));
router.post('/signin', validateAuthentication, asyncHandler(login));

// все роуты, кроме /signin и /signup, защищены авторизацией;
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Маршрут не найден'));
});

export default router;
