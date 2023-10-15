import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from '@config/database';
import UserRouter from '@routers/userRouter';
import HouseRouter from '@routers/houseRouter';
import * as middlewares from './middleware/middlewares';

dotenv.config();
connectDB();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/users', UserRouter);
app.use('/api/houses', HouseRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
