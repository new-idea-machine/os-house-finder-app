import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@constants/types';
import Cookie from 'js-cookie';

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
      localStorage.removeItem('token');
      Cookie.remove('jwt');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
