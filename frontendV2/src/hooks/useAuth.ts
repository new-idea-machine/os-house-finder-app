import { useAppDispatch } from '@app/hooks';
import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} from '@api/auth/authApi';
import { Credentials, RegisterResponse, UserResponse } from '@constants/types';
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from '@utils/IsFetchBaseQueryError';
import { setCredentials, logout } from '@features/authSlice';
import { useToast } from '@components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

export default function useAuth() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { toast } = useToast();

  // const { removeCookie } = useCookies();

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, registerResult] = useRegisterMutation();
  const [logoutMutation] = useLogoutMutation();

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
      const response = await logoutMutation();

      if ('error' in response) {
        const { error } = response;
        toast({
          variant: 'destructive',
          title: 'Error',
          description: JSON.stringify(error),
        });
        return;
      }
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

  const handleRegister = async (credentials: Credentials) => {
    try {
      const response = await register(credentials);

      if ('error' in response) {
        const { error } = response;
        toast({
          variant: 'destructive',
          title: 'Error',
          description: JSON.stringify(error),
        });
        return;
      }

      const userData: RegisterResponse = response.data!;

      const { id, email, role } = userData;

      dispatch(setCredentials({ id, email, role }));
      toast({
        title: 'Success',
        description: 'Register successful',
      });
      navigate('/');
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

  return {
    handleLogin,
    isLoginLoading,
    handleLogout,
    handleRegister,
    registerResult,
  };
}
