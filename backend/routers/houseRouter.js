import { getHouse, getHouses, createHouse, updateHouse, deleteHouse } from '../controllers/houseController.js';
import express from 'express';

const houseRouter = express.Router();

// GET all houses
houseRouter.get('/', getHouses);

// POST create a new house
houseRouter.post('/', createHouse);

// GET a specific house by ID
houseRouter.get('/:id', getHouse);

// PUT update a specific house by ID
houseRouter.put('/:id', updateHouse);

// DELETE a specific house by ID
houseRouter.delete('/:id', deleteHouse);

export default houseRouter;