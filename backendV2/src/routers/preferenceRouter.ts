import express from 'express';
import preference from '@controllers/preferenceController';

const preferenceRouter = express.Router({ mergeParams: true });

// GET all preferences
preferenceRouter.get('/', preference.getAllPreferences);

// POST create a new preference
preferenceRouter.post('/', preference.createPreference);

// GET a specific preference by ID
preferenceRouter.get('/:id', preference.getPreference);

// PUT update a specific preference by ID
preferenceRouter.put('/:id', preference.updatePreference);

// DELETE a specific preference by ID
preferenceRouter.delete('/:id', preference.deletePreference);

export default preferenceRouter;
