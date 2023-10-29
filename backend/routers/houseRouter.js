import { getHouse, getHouses, createHouse, updateHouse, deleteHouse, getScraped } from '@controllers/houseController.js';
import express from 'express';

const houseRouter = express.Router();

// GET all houses
houseRouter.get('/', getHouses);

// POST create a new house
houseRouter.post('/', createHouse);

// GET a specific house by ID
houseRouter.get('/:id', getHouse);

// GET Screaped data by realtor.ca url
houseRouter.get('/:url', getScraped);

// PUT update a specific house by ID
houseRouter.put('/:id', updateHouse);

// DELETE a specific house by ID
houseRouter.delete('/:id', deleteHouse);

export default houseRouter;