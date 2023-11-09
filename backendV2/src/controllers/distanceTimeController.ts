import {  Request, Response } from 'express';
import calculateDistanceAndTime, { Location } from '@src/services/distanceTimeCalculator';

export const getDistanceAndTime = async (
  req: Request,
  res: Response): Promise<void> => {
  try {
    const start: Location = {
      latitude: req.body.start.lat,
      longitude: req.body.start.long,
    };
    const end: Location = {
      latitude: req.body.end.lat,
      longitude: req.body.end.long,
    };
    const results = await calculateDistanceAndTime(start, end);
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json(error);
  }
};