import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import ctStationRouter from '@routers/ctStationRouter';
import distanceTimeRouter from '@routers/distanceTimeRouter';
import preferenceRouter from './routers/preferenceRouter';
import * as middlewares from './middleware/middlewares';
import UserRouter from './routers/userRouter';
import HouseRouter from './routers/houseRouter';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());

const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173/'],
  credentials: true,
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/api/users', UserRouter);
app.use('/api/houses', HouseRouter);
app.use('/api/preferences', preferenceRouter);
app.use('/api/ctstations', ctStationRouter);
app.use('/api/distance', distanceTimeRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
