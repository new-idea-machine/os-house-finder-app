import express from 'express';
import { googleLogin, googleUserData } from '@controllers/oauthController';

const oauthRouter = express.Router();

// Google url request
oauthRouter.post('/googlelogin', googleLogin);

// Google user data
oauthRouter.get('/google', googleUserData);

export default oauthRouter;
