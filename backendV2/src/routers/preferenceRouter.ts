import express from 'express';
import {
  getAllPreferences,
  getPreference,
  createPreference,
  updatePreference,
  deletePreference,
} from '@controllers/preferenceController';
import { userAuth } from '@middleware/userAuth';

const preferenceRouter = express.Router({ mergeParams: true });

// GET all preferences
preferenceRouter.get('/', getAllPreferences);

// POST create a new preference
preferenceRouter.post('/', userAuth, createPreference);

// GET a specific preference by ID
preferenceRouter.get('/:id', getPreference);

// PUT update a specific preference by ID
preferenceRouter.put('/:id', userAuth, updatePreference);

// DELETE a specific preference by ID
preferenceRouter.delete('/:id', userAuth, deletePreference);

export default preferenceRouter;
