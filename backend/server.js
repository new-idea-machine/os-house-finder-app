import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './config/database.js';

dotenv.config();

connectDB();

const port = process.env.PORT || 5000;

const app = express();


app.use(express.json());

//TODO app.use('/api/houses', houseRouter);


app.listen(port, () => console.log(`Server running on port ${port}`));
