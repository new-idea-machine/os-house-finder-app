import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface HouseState {
  value: Record<string, any> | null; // Adjust the type to match your data structure
}

const initialState: HouseState = {
  value: null,
};

export const fetchHouse = createAsyncThunk(
  'house/fetchHouse',
  async (id: string, thunkAPI) => {
    const response = await fetch(`http://localhost:5001/api/houses/${id}`);
    const data = await response.json();
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
