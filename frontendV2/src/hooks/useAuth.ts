import { useAppDispatch, useAppSelector } from '@app/hooks';
import { useLoginMutation, useLogoutMutation } from '@api/auth/authApi';
import { Credentials } from '@constants/types';
import { setCredentials, logout } from '@features/authSlice';

import { toast } from 'react-toastify';

import { useEffect } from 'react';

export default function useAuth() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const [login, loginResult] = useLoginMutation();

  const [logout, logoutResult] = useLogoutMutation();

  const handleLogin = async (credentials: Credentials) => {
    try {
      const response = await login(credentials);
      console.log('Response, ', response);

      const { _id, email, role } = response.data;

      dispatch(setCredentials({ _id, email, role }));
    } catch (error) {
      console.log('Error, ', error);
      toast.error(error?.data?.message || error.error);
    }
  };

  return { handleLogin };
}
