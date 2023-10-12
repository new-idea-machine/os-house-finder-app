import User from '../models/userModel.js';

// Controller for user registration
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email is already in use
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      return res.status(400).json({
        message: 'Email already in use',
      });
    }

    // Create a new user instance
    const newUser = new User({
      email,
      password,
    });
    await newUser.save();

    // Generate a JWT token
    const token = newUser.generateToken();

    return res.status(201).json({
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
    });
  }
};

export const logoutUser = async (req, res) => {
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

// Controller for user login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    // Generate a JWT token
    const token = user.generateToken();

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_EVN !== 'development',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });
    // TODO to be removed when frontend team figure out cookie setting
    res.setHeader('Authorization', `Bearer ${token}`);

    res.json({
      _id: user._id,
      email: user.email,
      role: user.role,
    });

    // return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
    });
  }
};

// Controller for updating user email and password
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { email, password } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    // Check if the user is authorized to perform this action
    if (!(user.email === req.user.email || req.user.role === 'admin')) {
      return res.status(403).json({
        message: 'You are not authorized to perform this action',
      });
    }

    // Check if the email is already in use
    const temp = await User.findOne({
      email,
    });
    if (email && email !== user.email && temp) {
      return res.status(400).json({
        message: 'Email already in use',
      });
    }

    // Update user's email and password
    user.email = email || user.email;
    user.password = password || user.password;
    await user.save();

    return res.status(200).json({
      message: 'User updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
    });
  }
};

// Controller for deleting a user
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID and delete
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    // Check if the user is authorized to perform this action
    if (!(user.email === req.user.email || req.user.role === 'admin')) {
      return res.status(403).json({
        message: 'You are not authorized to perform this action',
      });
    }

    return res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
    });
  }
};

// Controller for getting user information
export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    // Check if the user is authorized to perform this action
    if (!(user.email === req.user.email || req.user.role === 'admin')) {
      return res.status(403).json({
        message: 'You are not authorized to perform this action',
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
    });
  }
};

// Controller for getting all registered users' information
export const getAllUsers = async (req, res) => {
  try {
    // Check if the user is authorized to perform this action
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'You are not authorized to perform this action',
      });
    }
    // Find all users
    const users = await User.find();

    return res.status(200).json({
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Server error',
    });
  }
};
