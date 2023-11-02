import express from "express";
import houseRouter from './routers/houseRouter.js';
import userRouter from './routers/userRouter.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const corsOptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173/'],
    credentials: true,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  };


const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/api/houses', houseRouter);
app.use('/api/users', userRouter);

export default app;