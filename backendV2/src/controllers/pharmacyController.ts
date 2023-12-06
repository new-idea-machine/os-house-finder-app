import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import PharmacyModel, { IPharmacy, Pharmacy, PharmacyZodSchema } from '../models/pharmacyModel';

const router = express.Router();

export const updatePharmacy = async (req: Request, res: Response) => {
  let deletedData: IPharmacy[] = [];
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'No URL provided' });
    }

    // Fetch the JSON data from the provided URL
    // {
    //   "url":"https://medimap.ca/_next/data/4IM8akTNHNJ5kBGswctIf/clinics/pharmacies/ab/calgary.json?page=1&facilityType=pharmacies&region=ab&city=calgary"
    // }

    console.log('Fetching data from:', url);
    const response = await axios.get(url);

    if (response.status !== 200) {
      return res.status(500).json({ error: 'Failed to fetch the CSV file' });
    }

    // Backup existing pharmacy data
    deletedData = await PharmacyModel.find();
    // Clear existing pharmacy data
    await PharmacyModel.deleteMany({});

    const originalPharmacies: any[] = response.data.pageProps.clinicData;

    // Transform and filter the data to match the Mongoose model
    const transformedPharmacies: Pharmacy[] = originalPharmacies.map((originalPharmacy) => {
      return {
        name: originalPharmacy.name || '',
        address: originalPharmacy.address || '',
        address_unit: originalPharmacy.address_unit || '',
        city: originalPharmacy.city || '',
        province: originalPharmacy.region || originalPharmacy.province || '',
        post_code: originalPharmacy.post_code || '',
        phone: originalPharmacy.phone || '',
        email: originalPharmacy.email || '',
        lat: originalPharmacy.lat,
        lng: originalPharmacy.lng,
      };
    });

    // Validate the transformed data using Zod schema
    transformedPharmacies.forEach((pharmacy) => {
      PharmacyZodSchema.parse(pharmacy);
    });

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string);

    // Insert data into the database
    const insertResult = await PharmacyModel.insertMany(transformedPharmacies);

    console.log('Pharmacies imported successfully:', insertResult);

    res.status(200).json({ message: 'Pharmacies imported successfully' });
  } catch (error) {
    // Restore the backup data
    if (deletedData.length > 0) {
      await PharmacyModel.insertMany(deletedData);
    }
    console.error('Error importing pharmacies:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
