import express from 'express';
import { updateCTStations } from '@controllers/ctStationController';

const ctStationRouter = express.Router();

ctStationRouter.post('/', updateCTStations);

export default ctStationRouter;