import { ReactNode, useEffect, useCallback } from 'react';
import { useLazyGoogleLoginQuery } from '@api/auth/authApi';
import { useToast } from '@components/ui/use-toast';
import { useAppDispatch } from '@app/hooks';
import { setCredentials } from '@features/authSlice';
import { useNavigate } from 'react-router-dom';
import { UserResponse } from '@constants/types';
import useAuth from '@hooks/useAuth';

interface GoogleLoginButtonProps {
  children: ReactNode;
}

interface GoogleLoginCredentials {
  client_id: string;
  credential: string;
}

// function navigate(url: string) {
//   window.location.href = url;
// }

export default function GoogleLoginButton({
  children,
}: GoogleLoginButtonProps) {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [getGoogleUser, result] = useLazyGoogleLoginQuery();
  const navigate = useNavigate();

  const { handleGoogleLogin } = useAuth();

  const auth = async () => {
    const response = await fetch(
      'http://localhost:5001/api/oauth/googlelogin',
      {
        method: 'POST',
      }
    );
    const data = await response.json();
    console.log(data);
    navigate(data.data.url);
  };
  // const handleGoogleLogin = () => {
  //   auth();
  //   console.log('Google Login');
  // };

  async function decodeResponse(credential: string) {
    console.log('credential', credential);
    const url = new URL('http://localhost:5001/api/oauth/gsi');
    url.searchParams.append('code', credential);
    const localReq = await fetch(url);
    const data = await localReq.json();
    return data;
  }

  // const handleGoogleLogin = useCallback(
  //   async (response: GoogleLoginCredentials) => {
  //     // const responsePayload = await decodeResponse(response.credential);
  //     // console.log('Encoded JWT ID token', response.credential);
  //     // console.log('responsePayload', responsePayload);

  //     const responsePayload = await getGoogleUser(response.credential);
  //     console.log('responsePayload', responsePayload);
  //     console.log('googleUser', result);
  //     if (responsePayload.isSuccess) {
  //       const { data } = result;
  //       console.log('data', data);
  //       toast({
  //         title: 'Login Successful',
  //         description: `Welcome back ${responsePayload?.data?.email}!`,
  //         duration: 2000,
  //       });
  //       const { _id: id, email, role } = responsePayload?.data as UserResponse;
  //       dispatch(setCredentials({ id, email, role }));

  //       navigate('/profiles');
  //       console.log('response', response);
  //     }
  //   },
  //   []
  // );

  async function getKeys() {
    const keys = await fetch('http://localhost:5001/api/oauth/getkeys');
    const data = await keys.json();
    console.log(data);
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleLogin,
    });

    google.accounts.id.renderButton(
      document.getElementById('google-login-button'),
      {
        theme: 'outline',
        size: 'large',
        type: 'standard',
        text: 'continue_with',
        shape: 'rectangular',
        width: 'auto',
      }
    );
  }, [handleGoogleLogin]);

  return (
    <div
      id="google-login-button"
      // onClick={handleGoogleLogin}
      className="flex w-full justify-center gap-4"
    >
      {children}
    </div>
  );
}
