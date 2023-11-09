import { ReactNode, useEffect } from 'react';
import useAuth from '@hooks/useAuth';

interface GoogleLoginButtonProps {
  children: ReactNode;
}

export default function GoogleLoginButton({
  children,
}: GoogleLoginButtonProps) {
  const { handleGoogleLogin } = useAuth();

  useEffect(() => {
    // eslint-disable-next-line
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleLogin,
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
  }, [handleGoogleLogin]);

  return (
    <div
      id="google-login-button"
      // onClick={handleGoogleLogin}
      className="flex h-12 w-full justify-center"
    >
      {children}
    </div>
  );
}
