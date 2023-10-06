import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@constants/types';

interface UserState {
  userInfo: User | null;
}

const initialState: UserState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') as string)
    : null,
};

console.log('Initial state, ', initialState);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User | null>) => {
      console.log('State, ', state);

      console.log('Action, ', action);

      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
