import mongoose from 'mongoose';
import { z } from 'zod';

export interface IHouse extends mongoose.Document {
  address: string;
  price: number;
  city: string;
  province: string;
  postalCode: string;
  propertyType: string;
  buildingType: string;
  storeys: string;
  squareFootage: string;
  communityName: string;
  subdivisionName: string;
  title: string;
  landSize: string;
  builtIn: string;
  annualPropertyTaxes: string;
  parkingType: string;
  timeOnRealtorCa: string;
  appliancesIncluded: string;
  flooring: string;
  basementType: string;
  features: string;
  foundationType: string;
  constructionMaterial: string;
  totalFinishedArea: string;
  structures: string;
  cooling: string;
  heatingType: string;
  exteriorFinish: string;
  amenitiesNearby: string;
  totalParkingSpaces: string;
  fencing: string;
  frontage: string;
  landDepth: string;
  zoningDescription: string;
  imageLink: string;
}

const HouseSchema = new mongoose.Schema<IHouse>({
  address: { type: String, required: true },
  price: { type: Number, required: true },
  city: { type: String, required: true, default: 'Calgary' },
  province: { type: String, required: true, default: 'Alberta' },
  postalCode: { type: String, required: true },
  propertyType: { type: String },
  buildingType: { type: String },
  storeys: { type: String },
  squareFootage: { type: String },
  communityName: { type: String },
  subdivisionName: { type: String },
  title: { type: String },
  landSize: { type: String },
  builtIn: { type: String },
  annualPropertyTaxes: { type: String },
  parkingType: { type: String },
  timeOnRealtorCa: { type: String },
  appliancesIncluded: { type: String },
  flooring: { type: String },
  basementType: { type: String },
  features: { type: String },
  foundationType: { type: String },
  constructionMaterial: { type: String },
  totalFinishedArea: { type: String },
  structures: { type: String },
  cooling: { type: String },
  heatingType: { type: String },
  exteriorFinish: { type: String },
  amenitiesNearby: { type: String },
  totalParkingSpaces: { type: String },
  fencing: { type: String },
  frontage: { type: String },
  landDepth: { type: String },
  zoningDescription: { type: String },
  imageLink: { type: String },
});

const HouseModel = mongoose.model('House', HouseSchema);

export const HouseZodSchema = z.object({
  address: z.string(),
  price: z.number(),
  city: z.string(),
  province: z.string(),
  postalCode: z.string(),
  propertyType: z.string().optional(),
  buildingType: z.string().optional(),
  storeys: z.string().optional(),
  squareFootage: z.string().optional(),
  communityName: z.string().optional(),
  subdivisionName: z.string().optional(),
  title: z.string().optional(),
  landSize: z.string().optional(),
  builtIn: z.string().optional(),
  annualPropertyTaxes: z.string().optional(),
  parkingType: z.string().optional(),
  timeOnRealtorCa: z.string().optional(),
  appliancesIncluded: z.string().optional(),
  flooring: z.string().optional(),
  basementType: z.string().optional(),
  features: z.string().optional(),
  foundationType: z.string().optional(),
  constructionMaterial: z.string().optional(),
  totalFinishedArea: z.string().optional(),
  structures: z.string().optional(),
  cooling: z.string().optional(),
  heatingType: z.string().optional(),
  exteriorFinish: z.string().optional(),
  amenitiesNearby: z.string().optional(),
  totalParkingSpaces: z.string().optional(),
  fencing: z.string().optional(),
  frontage: z.string().optional(),
  landDepth: z.string().optional(),
  zoningDescription: z.string().optional(),
  imageLink: z.string().optional(),
});

export type House = z.infer<typeof HouseZodSchema>;

export default HouseModel;