import mongoose, { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export interface IUser extends Document {
  email: string;
  password: string;
  role: string;

  comparePassword(password: string): Promise<boolean>;

  generateToken(): string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

// Hash and salt password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the generated salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error as Error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(password: string) {
  return bcrypt.compare(password, this.password);
};

// Method to generate a JWT token
userSchema.methods.generateToken = function() {
  const payload = {
    id: this._id,
    email: this.email,
    role: this.role,
  };

  // Sign the token with a secret key and set expiration time
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRE ? process.env.JWT_EXPIRE : '24h' });
};

// Create User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
