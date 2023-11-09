import express from 'express';
import { getDistanceAndTime } from '@controllers/distanceTimeController';

const distanceTimeRouter = express.Router();

// GET distance and time
distanceTimeRouter.get('/', getDistanceAndTime);

export default distanceTimeRouter;