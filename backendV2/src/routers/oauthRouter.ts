import express from 'express';
import {
  googleLogin,
  googleUserData,
  gsiUserCredentials,
} from '@controllers/oauthController';

const oauthRouter = express.Router();

// Google url request
oauthRouter.post('/googlelogin', googleLogin);

// Google user data
oauthRouter.get('/google', googleUserData);

// Google gsi user credentials generate userinfo
oauthRouter.get('/gsi', gsiUserCredentials);

export default oauthRouter;
