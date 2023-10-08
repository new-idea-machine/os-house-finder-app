import { useAppDispatch } from '@app/hooks';
import { useLoginMutation } from '@api/auth/authApi';
import { Credentials, User } from '@constants/types';
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from '@utils/IsFetchBaseQueryError';
import { setCredentials, logout } from '@features/authSlice';
import { toast } from 'react-toastify';

export default function useAuth() {
  const dispatch = useAppDispatch();

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const handleLogin = async (credentials: Credentials) => {
    try {
      const response = await login(credentials);

      if ('error' in response) {
        const { error } = response;
        toast.error(JSON.stringify(error));
        return;
      }

      const userData: User = response.data!;

      const { _id, email, role } = userData;

      dispatch(setCredentials({ _id, email, role }));
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const { data } = error;
        toast.error(JSON.stringify(data));
      } else if (isErrorWithMessage(error)) {
        const { message } = error;
        toast.error(message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logout());
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  };

  return { handleLogin, isLoginLoading, handleLogout };
}
