import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPEN_ROUTE_API_KEY || '';

export interface Location {
  latitude: number;
  longitude: number;
}

interface TravelInfo {
  mode: string; // 'driving-car', 'foot-walking', or 'cycling-regular'
  distance: number;
  duration: number;
}

const calculateDistanceAndTime = async (
  startLocation: Location,
  endLocation: Location,
): Promise<{ [mode: string]: TravelInfo }> => {
  const travelModes = ['driving-car', 'foot-walking', 'cycling-regular'];

  const modePromises = travelModes.map(async (mode) => {
    try {
      const coordinates = [
        [startLocation.longitude, startLocation.latitude],
        [endLocation.longitude, endLocation.latitude],
      ];

      const body = JSON.stringify({ coordinates });

      const headers = {
        'Authorization': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
      };

      const response = await fetch(`https://api.openrouteservice.org/v2/directions/${mode}`, {
        method: 'POST',
        headers,
        body,
      });

      if (response.ok) {
        const data = await response.json();
        const segment = data.routes[0].summary;
        return {
          mode,
          distance: segment.distance,
          duration: segment.duration,
        };
      }
      return null;
    } catch (error) {
      throw new Error('Error calling OpenRoute API');
    }
  });

  const resultsArray = await Promise.all(modePromises);

  const results: { [mode: string]: TravelInfo } = {};
  resultsArray.forEach((result, index) => {
    if (result !== null) {
      results[travelModes[index]] = result;
    }
  });

  return results;
};


export default calculateDistanceAndTime;
