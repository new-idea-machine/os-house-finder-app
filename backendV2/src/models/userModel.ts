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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Hash and salt password before saving
userSchema.pre('save', async function hashAndSaltPassword(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the generated salt
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error as Error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function comparePassword(
  password: string
) {
  return bcrypt.compare(password, this.password);
};

// Method to generate a JWT token
userSchema.methods.generateToken = function generateToken() {
  const payload = {
    id: this._id,
    email: this.email,
    role: this.role,
  };

  // Sign the token with a secret key and set expiration time
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE ? process.env.JWT_EXPIRE : '24h',
  });
};

// cascade delete preferences when a user is deleted

userSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function cascadeRemove(this: Document, next) {
    console.log(`Deleting preferences belonging to user ${this._id}`);
    await this.$model('Preference').deleteMany({ userId: this._id });
    next();
  }
);

// reverse populate with virtuals
userSchema.virtual('preferences', {
  ref: 'Preference',
  localField: '_id',
  foreignField: 'userId',
  justOne: false,
});

// Create User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
