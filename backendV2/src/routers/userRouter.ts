import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} from '@controllers/userController';
import { userAuth } from '@middleware/userAuth';
import { validateRequest } from '@middleware/validator';
import { UpdateUser, UserLogin, UserRegister } from '@validator/userValidator';

const userRouter = express.Router();

// Register a new user
userRouter.post(
  '/register',
  validateRequest({
    body: UserRegister,
  }),
  registerUser
);

// User login
userRouter.post(
  '/login',
  validateRequest({
    body: UserLogin,
  }),
  loginUser
);

// User logout
userRouter.post('/logout', logoutUser);

// Update user's email and password
userRouter.put(
  '/:id',
  userAuth,
  validateRequest({
    body: UpdateUser,
  }),
  updateUser
);

// Delete a user
userRouter.delete('/:id', userAuth, deleteUser);

// Get user information
userRouter.get('/:id', userAuth, getUser);

// Get information of all registered users
userRouter.get('/', userAuth, getAllUsers);

export default userRouter;
