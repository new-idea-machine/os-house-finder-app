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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User | null>) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
