import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import houseRouter from './routers/houseRouter.js';
import userRouter from './routers/userRouter.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

connectDB();

const port = process.env.PORT || 5000;

const app = express();

const corsOptions = {
  exposedHeaders: ['Set-Cookie', 'Authorization'],
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173/'],
  credentials: true,
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization, Set-Cookie',
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/api/houses', houseRouter);
app.use('/api/users', userRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
