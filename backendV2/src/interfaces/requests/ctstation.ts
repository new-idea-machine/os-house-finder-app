import { Request } from 'express';

export interface UpdateCTStations extends Request {
  params: {
    url:string;
  };
}