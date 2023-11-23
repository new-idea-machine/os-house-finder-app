import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: HouseState = {
  value: {
    data: {
      _id: '6535f02e3cf2f28c9fb6a168',
      address: '123 Elm Street',
      price: 30000,
      city: 'Calgary',
      province: 'Alberta',
      postalCode: 'T2X 1X1',
      propertyType: 'Single-Family',
      buildingType: 'Detached',
      storeys: '2',
      squareFootage: '1800',
      communityName: 'Greenwood',
      subdivisionName: 'Elmwood Estates',
      title: 'Spacious Family Home',
      landSize: '0.25 acres',
      builtIn: '2005',
      annualPropertyTaxes: '$3,500',
      parkingType: 'Attached Garage',
      timeOnRealtorCa: '30 days',
      appliancesIncluded: 'Refrigerator, Stove, Dishwasher',
      flooring: 'Hardwood, Carpet, Tile',
      basementType: 'Finished',
      features: 'Fireplace, Deck, Walk-in Closet',
      foundationType: 'Concrete',
      constructionMaterial: 'Wood Frame',
      totalFinishedArea: '2200 sq ft',
      structures: 'Storage Shed',
      cooling: 'Central Air',
      heatingType: 'Forced Air',
      exteriorFinish: 'Brick, Vinyl',
      amenitiesNearby: 'Schools, Parks, Shopping',
      totalParkingSpaces: '2',
      fencing: 'Fenced',
      frontage: '75 feet',
      landDepth: '150 feet',
      zoningDescription: 'Residential',
      imageLink: 'https://example.com/house1.jpg',
      __v: 0,
    },
  },
};

export interface HouseState {
  value: Record<string, any> | null; // Adjust the type to match your data structure
}

export const fetchHouse = createAsyncThunk(
  'house/fetchHouse',
  async (id: string, thunkAPI) => {
    const response = await fetch(`http://localhost:5001/api/houses/${id}`);
    console.log('url in slice', `http://localhost:5001/api/houses/${id}`);

    console.log('response in slice', response);

    const data = await response.json();
    console.log('data in slice', data);

    return data;
  }
);

export const houseSlice = createSlice({
  name: 'house',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchHouse.fulfilled,
      (state, action: PayloadAction<Record<string, any>>) => {
        state.value = action.payload;
      }
    );
  },
});

export default houseSlice.reducer;
