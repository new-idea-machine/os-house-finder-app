import mongoose from 'mongoose';
import { z } from 'zod';

export interface ICTStation extends mongoose.Document {
  stationName: string;
  leg: string;
  direction: string;
  distanceNorthbound: number | undefined;
  distanceSouthbound: number | undefined;
  distanceEastbound: number | undefined;
  distanceWestbound: number | undefined;
  route: string;
  status: string;
  lat: number;
  long: number;
}

const CTStationSchema = new mongoose.Schema<ICTStation>({
  stationName: { type: String, required: true },
  leg: { type: String, required: true },
  direction: { type: String, required: true },
  distanceNorthbound: { type: Number },
  distanceSouthbound: { type: Number },
  distanceEastbound: { type: Number },
  distanceWestbound: { type: Number },
  route: { type: String, required: true },
  status: { type: String, required: true },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
});

const CtStationModel = mongoose.model<ICTStation>('CTrainStation', CTStationSchema);

export const CTStationZodSchema = z.object({
  stationName: z.string(),
  leg: z.string(),
  direction: z.string(),
  distanceNorthbound: z.number().optional(),
  distanceSouthbound: z.number().optional(),
  distanceEastbound: z.number().optional(),
  distanceWestbound: z.number().optional(),
  route: z.string(),
  status: z.string(),
  lat: z.number(),
  long: z.number(),
});

// Define the CTrainStation type
export type CTrainStation = z.infer<typeof CTStationZodSchema>;

export default CtStationModel;
