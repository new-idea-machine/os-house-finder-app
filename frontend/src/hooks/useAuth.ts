import { useAppDispatch } from '@app/hooks';
import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useLazyGoogleLoginQuery,
} from '@api/auth/authApi';
import { Credentials, UserResponse } from '@constants/types';
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from '@utils/IsFetchBaseQueryError';
import { setCredentials, logout } from '@features/authSlice';
import { useToast } from '@components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface GoogleLoginResponse {
  client_id: string;
  credential: string;
}

export default function useAuth() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { toast } = useToast();

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, registerResult] = useRegisterMutation();
  const [logoutMutation] = useLogoutMutation();
  const [getGoogleUser, googleLoginResult] = useLazyGoogleLoginQuery();

  const handleGoogleLogin = async (googleResponse: GoogleLoginResponse) => {
    const responsePayload = await getGoogleUser(googleResponse.credential);

    toast({
      title: 'Login Successful',
      description: `Welcome back ${responsePayload?.data?.email}!`,
      duration: 2000,
    });

    const { _id: id, email, role } = responsePayload.data as UserResponse;
    dispatch(setCredentials({ id, email, role }));

    navigate('/profiles');
  };

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

      const userData: UserResponse = response.data!;

      const { _id: id, email, role } = userData;

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
    handleGoogleLogin,
    googleLoginResult,
  };
}
