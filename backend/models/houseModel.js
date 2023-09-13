import mongoose from 'mongoose';

const houseSchema = new mongoose.Schema({
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
      'Parking'],
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

const House = mongoose.model('House', houseSchema);

export default House;
