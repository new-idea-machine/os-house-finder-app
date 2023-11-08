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
  // const handleGoogleLogin = () => {
  //   auth();
  //   console.log('Google Login');
  // };

  const decodeResponse = async (credential) => {
    const url = new URL('http://localhost:5001/api/oauth/gsi');
    url.searchParams.append('code', credential);
    const localReq = await fetch(url);
    const data = await localReq.json();
    return data;
  };

  const handleGoogleLogin = async (response) => {
    // const responsePayload = await decodeResponse(response.credentials);
    // console.log('responsePayload', responsePayload);

    console.log('response', response);
  };

  const getKeys = async () => {
    const keys = await fetch('http://localhost:5001/api/oauth/getkeys');
    const data = await keys.json();
    console.log(data);
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      type="button"
      className="flex w-full gap-4"
    >
      {children}

      <div
        id="g_id_onload"
        data-client_id="51742808647-gcrgsv9uburntukqo6bm2c1sdbidgoat.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleGoogleLogin"
        data-auto_prompt="false"
      />

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      />
    </Button>
  );
}
