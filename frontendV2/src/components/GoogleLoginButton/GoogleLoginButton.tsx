import { ReactNode, useEffect } from 'react';
import useAuth, { GoogleLoginResponse } from '@hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface GoogleLoginButtonProps {
  children: ReactNode;
}

export default function GoogleLoginButton({
  children,
}: GoogleLoginButtonProps) {
  const { handleGoogleLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: (res: GoogleLoginResponse) => {
        handleGoogleLogin(res);
        setTimeout(() => {
          navigate('/profiles');
        }, 800);
      },
    });
    // eslint-disable-next-line
    // @ts-ignore
    google.accounts.id.renderButton(
      document.getElementById('google-login-button'),
      {
        theme: 'outline',
        size: 'large',
        type: 'standard',
        text: 'continue_with',
        shape: 'pill',
        width: '250px',
        height: 'auto',
      }
    );
    // eslint-disable-next-line
  }, [handleGoogleLogin]);

  return (
    <div id="google-login-button" className="flex h-12 w-full justify-center">
      {children}
    </div>
  );
}
