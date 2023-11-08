import { Button } from '@components/ui/button';
import { ReactNode } from 'react';

interface GoogleLoginButtonProps {
  children: ReactNode;
}

function navigate(url: string) {
  window.location.href = url;
}

export default function GoogleLoginButton({
  children,
}: GoogleLoginButtonProps) {
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
  const handleGoogleLogin = () => {
    auth();
    console.log('Google Login');
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      type="button"
      className="flex w-full gap-4"
    >
      {children}
    </Button>
  );
}
