import express from 'express';
import { gsiUserCredentials } from '@controllers/oauthController';

const oauthRouter = express.Router();

// Google gsi user credentials generate userinfo
oauthRouter.get('/gsi', gsiUserCredentials);

export default oauthRouter;
