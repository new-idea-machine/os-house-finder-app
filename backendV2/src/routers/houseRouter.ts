import express from 'express';
import {
  getHouse,
  getHouses,
  createHouse,
  updateHouse,
  deleteHouse,
  getScraped,
} from '@controllers/houseController';
import { validateRequest } from '@middleware/validator';
import { HouseZodSchema } from '@models/house.model';

const houseRouter = express.Router();

// GET all houses
houseRouter.get('/', getHouses);

// POST create a new house
houseRouter.post('/', validateRequest({ body: HouseZodSchema }), createHouse);

// GET a specific house by ID
houseRouter.get('/:id', getHouse);

// GET Scraped data by realtor.ca url
houseRouter.get('/:url', getScraped);

// PUT update a specific house by ID
houseRouter.put('/:id', validateRequest({ body: HouseZodSchema }), updateHouse);

// DELETE a specific house by ID
houseRouter.delete('/:id', deleteHouse);

export default houseRouter;
