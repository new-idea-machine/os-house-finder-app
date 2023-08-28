import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './config/database.js';
import houseRouter from './routers/houseRouter.js';
import userRouter from './routers/userRouter.js';

dotenv.config();

connectDB();

const port = process.env.PORT || 5000;

const app = express();


app.use(express.json());

app.use('/api/houses', houseRouter);
app.use('/api/users', userRouter);


app.listen(port, () => console.log(`Server running on port ${port}`));
