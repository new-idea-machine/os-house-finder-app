import { ReactNode, useEffect } from 'react';
import useAuth from '@hooks/useAuth';

interface GoogleLoginButtonProps {
  children: ReactNode;
}

// function navigate(url: string) {
//   window.location.href = url;
// }

export default function GoogleLoginButton({
  children,
}: GoogleLoginButtonProps) {
  const { handleGoogleLogin } = useAuth();

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
