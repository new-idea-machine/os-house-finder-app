import { Button } from '@components/ui/button';
import { ReactNode } from 'react';

interface GoogleLoginButtonProps {
  children: ReactNode;
}

export default function GoogleLoginButton({
  children,
}: GoogleLoginButtonProps) {
  const handleGoogleLogin = () => {
    // TODO: Implement Google Login
    // eslint-disable-next-line no-console
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
