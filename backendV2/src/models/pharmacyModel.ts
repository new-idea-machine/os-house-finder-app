import mongoose, { model, Schema } from 'mongoose';
import { z } from 'zod';

export interface IPharmacy extends Document {
  name: string;
  address: string;
  address_unit: string;
  city: string;
  province: string;
  post_code: string;
  phone: string;
  email: string | null;
  lat: number;
  lng: number;
}

// Create the Mongoose schema
const PharmacySchema = new Schema<IPharmacy>({
  name: { type: String, required: true },
  address: { type: String },
  address_unit: { type: String },
  city: { type: String },
  province: { type: String },
  post_code: { type: String },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

// Create and export the Mongoose model
const PharmacyModel = model<IPharmacy>('Pharmacy', PharmacySchema);

// Create the Zod schema for validation
export const PharmacyZodSchema = z.object({
  name: z.string(),
  address: z.string(),
  address_unit: z.string(),
  city: z.string(),
  province: z.string(),
  post_code: z.string(),
  phone: z.string().optional(),
  email: z.string().optional(),
  lat: z.number(),
  lng: z.number(),
});

export type Pharmacy = z.infer<typeof PharmacyZodSchema>;

export default PharmacyModel;
