import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser: IUser | null = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const newUser: IUser = new User({ email, password });
    await newUser.save();

    const token: string = newUser.generateToken();

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    return res.status(200).json({ message: 'Successfully logged out' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch: boolean = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token: string = user.generateToken();

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });

    res.json({ _id: user._id, email: user.email, role: user.role });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id;
    const { email, password } = req.body;

    const user: IUser | null = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!(user.email === req.user?.email || req.user?.role === 'admin')) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to perform this action' });
    }

    const temp: IUser | null = await User.findOne({ email });

    if (email && email !== user.email && temp) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    user.email = email || user.email;
    user.password = password || user.password;
    await user.save();

    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id;

    const user: IUser | null = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!(user.email === req.user?.email || req.user?.role === 'admin')) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to perform this action' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id;

    const user: IUser | null = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!(user.email === req.user?.email || req.user?.role === 'admin')) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to perform this action' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    if (req.user?.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'You are not authorized to perform this action' });
    }

    const users: IUser[] = await User.find();

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
