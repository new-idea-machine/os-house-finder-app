import { Request, Response } from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import PharmacyModel, { IPharmacy, Pharmacy, PharmacyZodSchema } from '../models/pharmacyModel';


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

    const response = await axios.get(url);

    if (response.status !== 200) {
      return res.status(500).json({ error: 'Failed to fetch the CSV file' });
    }

    // Backup existing pharmacy data
    deletedData = await PharmacyModel.find();
    // Clear existing pharmacy data
    await PharmacyModel.deleteMany({});

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalPharmacies: any[] = response.data.pageProps.clinicData;

    // Transform and filter the data to match the Mongoose model
    const transformedPharmacies: Pharmacy[] = originalPharmacies.map((originalPharmacy) => ({
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
    }));

    // Validate the transformed data using Zod schema
    transformedPharmacies.forEach((pharmacy) => {
      PharmacyZodSchema.parse(pharmacy);
    });

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string);

    // Insert data into the database
    const insertResult = await PharmacyModel.insertMany(transformedPharmacies);

    return res.status(200).json({ message: 'Pharmacies imported successfully', data: insertResult });
  } catch (error) {
    // Restore the backup data
    if (deletedData.length > 0) {
      await PharmacyModel.insertMany(deletedData);
    }
    return res.status(500).json({ error });
  }
};
