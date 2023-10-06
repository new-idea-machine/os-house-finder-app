import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const userAuth = async (req, res, next) => {
  // Get the token from the request headers
   //const token = req.header('Authorization');
  let token;

  token = req.cookies.jwt;

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }
 
  try {
    // Verify the token and extract the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user's ID and email to the request object
    // req.user = {
    //   id: decoded.id,
    //   email: decoded.email,
    //   role: decoded.role,
    // };

    req.user = await User.findById(decoded.id).select('-password');

    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
