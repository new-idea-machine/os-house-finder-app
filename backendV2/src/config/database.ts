/* eslint-disable no-console */
import mongoose from 'mongoose';

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI as string)
    // eslint-disable-next-line no-console
    .then(() => console.log('MongoDB connected'))
    // eslint-disable-next-line no-console
    .catch((err) => console.log(err));
};
