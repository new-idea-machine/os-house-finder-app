import express from 'express';
import preference from '@controllers/preferenceController';

const preferenceRouter = express.Router();

// GET all houses
preferenceRouter.get('/', preference.getAllPreferences);

// POST create a new house
preferenceRouter.post('/', preference.createPreference);

// GET a specific house by ID
preferenceRouter.get('/:id', preference.getPreference);

// PUT update a specific house by ID
preferenceRouter.put('/:id', preference.updatePreference);

// DELETE a specific house by ID
preferenceRouter.delete('/:id', preference.deletePreference);

export default preferenceRouter;
