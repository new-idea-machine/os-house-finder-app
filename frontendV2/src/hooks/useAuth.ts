import { useAppDispatch } from '@app/hooks';
import { useLoginMutation } from '@api/auth/authApi';
import { Credentials, UserResponse } from '@constants/types';
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from '@utils/IsFetchBaseQueryError';
import { setCredentials, logout } from '@features/authSlice';
import { useToast } from '@components/ui/use-toast';
// import { toast } from 'react-toastify';

export default function useAuth() {
  const dispatch = useAppDispatch();

  const { toast } = useToast();

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const handleLogin = async (credentials: Credentials) => {
    try {
      const response = await login(credentials);

      if ('error' in response) {
        const { error } = response;
        toast({
          variant: 'destructive',
          title: 'Error',
          description: JSON.stringify(error),
        });
        return;
      }

      const userData: UserResponse = response.data!;

      const { _id: id, email, role } = userData;

      dispatch(setCredentials({ id, email, role }));
      toast({
        title: 'Success',
        description: 'Login successful',
      });
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const { data } = error;
        toast({
          variant: 'destructive',
          title: 'Error',
          description: JSON.stringify(data),
        });
      } else if (isErrorWithMessage(error)) {
        const { message } = error;
        toast({
          variant: 'destructive',
          title: 'Error',
          description: message,
        });
      }
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(logout());
      toast({
        title: 'Success',
        description: 'Logout successful',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: JSON.stringify(error),
      });
    }
  };

  return { handleLogin, isLoginLoading, handleLogout };
}
