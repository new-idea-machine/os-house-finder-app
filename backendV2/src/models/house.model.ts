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
  propertyType: z.string(),
  buildingType: z.string(),
  storeys: z.string(),
  squareFootage: z.string(),
  communityName: z.string(),
  subdivisionName: z.string(),
  title: z.string(),
  landSize: z.string(),
  builtIn: z.string(),
  annualPropertyTaxes: z.string(),
  parkingType: z.string(),
  timeOnRealtorCa: z.string(),
  appliancesIncluded: z.string(),
  flooring: z.string(),
  basementType: z.string(),
  features: z.string(),
  foundationType: z.string(),
  constructionMaterial: z.string(),
  totalFinishedArea: z.string(),
  structures: z.string(),
  cooling: z.string(),
  heatingType: z.string(),
  exteriorFinish: z.string(),
  amenitiesNearby: z.string(),
  totalParkingSpaces: z.string(),
  fencing: z.string(),
  frontage: z.string(),
  landDepth: z.string(),
  zoningDescription: z.string(),
  imageLink: z.string(),
});

export type House = z.infer<typeof HouseZodSchema>;

export default HouseModel;