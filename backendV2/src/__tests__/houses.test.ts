import 'dotenv/config';
import 'jest';
import request from 'supertest';

const mockHouseData = {
  address: "456 Oak Lane",
  price: 220000,
  city: "Calgary",
  province: "Alberta",
  postalCode: "T2Y 2Y2",
  propertyType: "Condo",
  buildingType: "Apartment",
  storeys: "3",
  squareFootage: "1000",
  communityName: "Downtown",
  subdivisionName: "Oak View Condos",
  title: "Downtown Living",
  landSize: "N/A",
  builtIn: "2010",
  annualPropertyTaxes: "$2,800",
  parkingType: "Underground Parking",
  timeOnRealtorCa: "20 days",
  appliancesIncluded: "Refrigerator, Stove, Microwave",
  flooring: "Laminate, Tile",
  basementType: "N/A",
  features: "Balcony, Fitness Center",
  foundationType: "Concrete",
  constructionMaterial: "Concrete",
};

const baseURL = `http://localhost:${process.env.PORT ? process.env.PORT : 5001}`;
let authToken: string = '';
let houseId: string = '';
describe('House API', () => {

  it('should create a new house', async () => {
    const response = await request(baseURL)
      .post('/api/houses/')
      .set('Cookie', [`jwt=${authToken}`])
      .send(mockHouseData);

    if (response.body.data) {
      houseId = response.body.data._id;
    }

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('House created');
    expect(response.body.data).toEqual(expect.objectContaining(mockHouseData));
  });

  it('should retrieve a house by ID', async () => {
    const response = await request(baseURL)
      .get(`/api/houses/${houseId}`)
      .set('Cookie', [`jwt=${authToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('House found');
    expect(response.body.data).toEqual(expect.objectContaining(mockHouseData));
  });

  it('should update a house by ID', async () => {
    // Define the updated data
    const updatedHouseData = { ...mockHouseData, price: 250000 };

    // Update the house
    const response = await request(baseURL)
      .put(`/api/houses/${houseId}`)
      .set('Cookie', [`jwt=${authToken}`])
      .send(updatedHouseData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`House with ID ${houseId} updated successfully.`);
    expect(response.body.data).toEqual(expect.objectContaining(updatedHouseData));
  });

  it('should delete a house by ID', async () => {
    // Delete the house
    const response = await request(baseURL)
      .delete(`/api/houses/${houseId}`)
      .set('Cookie', [`jwt=${authToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`House with ID ${houseId} deleted successfully.`);
  });
});
