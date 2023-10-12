import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IHouse extends Document {
  unitNumber?: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  propertyType?: string;
  buildingType?: string;
  storeys?: number;
  squareFootage?: number;
  communityName?: string;
  subdivisionName?: string;
  title?: string;
  lotSize?: number;
  builtIn?: number;
  annualPropertyTaxes?: number;
  bedroomsAboveGrade?: number;
  bedroomsBelowGrade?: number;
  bathrooms?: number;
  partialEnsuites?: number;
  appliancesIncluded?: {
    washer?: boolean;
    fridge?: boolean;
    dishwasher?: boolean;
    stove?: boolean;
    dryer?: boolean;
    microwave?: boolean;
  };
  flooringTypes?: string;
  basementType?: string;
  heatingType?: string;
  coolingType?: string;
  exteriorFinish?: string;
  parkingType?: string;
  parkingSpots?: number;
  features?: string;
  foundationType?: string;
  style?: string;
  architectureStyle?: string;
  constructionMaterial?: string;
  additionalStructures?: string;
  fencing?: string;
  frontage?: number;
  landDepth?: number;
  zoningCode?: string;
  imageLink?: string;
  transit?: Record<string, unknown>;
  schools?: Record<string, unknown>;
  offLeashDogAreas?: Record<string, unknown>;
  floodMaps?: Record<string, unknown>;
  licensedChildcare?: Record<string, unknown>;
  solarPower?: Record<string, unknown>;
  airQuality?: Record<string, unknown>;
  crime?: Record<string, unknown>;
  airplaneNoise?: Record<string, unknown>;
}

const houseSchema: Schema<IHouse> = new mongoose.Schema<IHouse>({
  unitNumber: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    default: 'Calgary',
    required: true,
  },
  province: {
    type: String,
    default: 'Alberta',
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    enum: [
      'Residential',
      'Condo/Strata',
      'Vacant Land',
      'Recreational',
      'Multi Family',
      'Agriculture',
      'Parking',
    ],
  },
  buildingType: {
    type: String,
  },
  storeys: {
    type: Number,
  },
  squareFootage: {
    type: Number,
  },
  communityName: {
    type: String,
  },
  subdivisionName: {
    type: String,
  },
  title: {
    type: String,
  },
  lotSize: {
    type: Number,
  },
  builtIn: {
    type: Number,
  },
  annualPropertyTaxes: {
    type: Number,
  },
  bedroomsAboveGrade: {
    type: Number,
  },
  bedroomsBelowGrade: {
    type: Number,
  },
  bathrooms: {
    type: Number,
  },
  partialEnsuites: {
    type: Number,
  },
  appliancesIncluded: {
    washer: { type: Boolean },
    fridge: { type: Boolean },
    dishwasher: { type: Boolean },
    stove: { type: Boolean },
    dryer: { type: Boolean },
    microwave: { type: Boolean },
  },
  flooringTypes: {
    type: String,
  },
  basementType: {
    type: String,
  },
  heatingType: {
    type: String,
  },
  coolingType: {
    type: String,
  },
  exteriorFinish: {
    type: String,
  },
  parkingType: {
    type: String,
  },
  parkingSpots: {
    type: Number,
  },
  features: {
    type: String,
  },
  foundationType: {
    type: String,
  },
  style: {
    type: String,
  },
  architectureStyle: {
    type: String,
  },
  constructionMaterial: {
    type: String,
  },
  additionalStructures: {
    type: String,
  },
  fencing: {
    type: String,
  },
  frontage: {
    type: Number,
  },
  landDepth: {
    type: Number,
  },
  zoningCode: {
    type: String,
  },
  imageLink: {
    type: String,
  },
  transit: {},
  schools: {},
  offLeashDogAreas: {},
  floodMaps: {},
  licensedChildcare: {},
  solarPower: {},
  airQuality: {},
  crime: {},
  airplaneNoise: {},
});

const House: Model<IHouse> = mongoose.model('House', houseSchema);

export default House;
