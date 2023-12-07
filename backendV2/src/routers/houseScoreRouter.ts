import express from 'express';
import { createHouseScore } from '@controllers/houseScoreController';

const houseScoreRouter = express.Router();

houseScoreRouter.route('/').post(createHouseScore);

export default houseScoreRouter;
