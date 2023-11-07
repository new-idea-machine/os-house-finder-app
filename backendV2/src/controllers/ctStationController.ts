import { Response } from 'express';
import axios from 'axios';
import { parse } from 'csv-parse';
import CtStationModel from '@models/ctStationModel';
import { ICTStation } from '@models/ctStationModel';
import { UpdateCTStations } from '@interfaces/requests/ctstation';

// Update the CTrain stations. Based on the provided URL, fetch the CSV file and parse it.
// {
//     "url":"https://data.calgary.ca/api/views/2axz-xm4q/rows.csv"
// }
export const updateCTStations = async (
  req: UpdateCTStations,
  res: Response,
) => {
  let deletedData: ICTStation[] = [];
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'No URL provided' });
    }

    // Fetch the CSV file from the provided URL
    const response = await axios.get(url);

    // Check if the response status is OK
    if (response.status !== 200) {
      return res.status(500).json({ error: 'Failed to fetch the CSV file' });
    }
    deletedData = await CtStationModel.find();
    // Clear existing CTrainStation data
    await CtStationModel.deleteMany({});

    const headers = [
      'STATIONNAM',
      'LEG',
      'DIRECTION',
      'DIST_NB',
      'DIST_SB',
      'DIST_EB',
      'DIST_WB',
      'ROUTE',
      'STATUS',
      'the_geom',
    ];

    parse(response.data, {
      delimiter: ',',
      columns: headers,
    }, (error, data) => {
      for (let station of data) {
        const { STATIONNAM, LEG, DIRECTION, DIST_NB, DIST_SB, DIST_EB, DIST_WB, ROUTE, STATUS, the_geom } = station;

        const latlong = the_geom.match(/\(([^)]+)\)/);

        if (latlong) {
          const coordinatesStr = latlong[1];
          const [long, lat] = coordinatesStr.split(' ');
          const ctStation = new CtStationModel({
            stationName: STATIONNAM,
            leg: LEG,
            direction: DIRECTION,
            distanceNorthbound: DIST_NB,
            distanceSouthbound: DIST_SB,
            distanceEastbound: DIST_EB,
            distanceWestbound: DIST_WB,
            route: ROUTE,
            status: STATUS,
            lat: Number(lat),
            long: Number(long),
          });
          ctStation.save();
        }
      }
    });
    return res.status(200).json({ message: 'CTrain stations updated' });
  } catch (error) {
    // If there was an error, restore the deleted data
    await CtStationModel.create(deletedData);
    return res.status(500).json({ error });
  }
};
