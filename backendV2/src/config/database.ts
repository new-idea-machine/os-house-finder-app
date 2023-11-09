/* eslint-disable no-console */
import mongoose from 'mongoose';

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));
};
