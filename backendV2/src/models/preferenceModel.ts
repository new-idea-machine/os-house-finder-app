import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './userModel';

export interface IPreference extends Document {
  squareFoot: { min: number; max: number };
  workLocation: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  schoolLocation: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  transportation: string;
  bedrooms: number;
  safetyScore: number;
  weightings: {
    squareFoot: number;
    travelTime: number;
    bedrooms: number;
    safetyScore: number;
  };
  userId: IUser['_id'];
}

const preferenceSchema: Schema<IPreference> = new Schema(
  {
    squareFoot: {
      min: {
        type: Number,
        required: true,
        default: 0,
      },
      max: {
        type: Number,
        required: true,
        default: 1000,
      },
    },
    workLocation: {
      street: String,
      city: { type: String, default: 'Calgary' },
      province: { type: String, default: 'Alberta' },
      postalCode: String,
    },
    schoolLocation: {
      street: String,
      city: { type: String, default: 'Calgary' },
      province: { type: String, default: 'Alberta' },
      postalCode: String,
    },
    transportation: { type: String, default: 'driving' },
    bedrooms: { type: Number, default: 1 },
    safetyScore: { type: Number, default: 0 },
    weightings: {
      squareFoot: { type: Number, default: 0 },
      travelTime: { type: Number, default: 0 },
      bedrooms: { type: Number, default: 0 },
      safetyScore: { type: Number, default: 0 },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Preference = mongoose.model<IPreference>(
  'Preference',
  preferenceSchema
);
