import LoginScreen from '@pages/LoginScreen';
import React from 'react';
import RegisterScreen from '@pages/RegisterScreen';
import { PasswordShowProvider } from '@/context/PasswordShowProvider';

interface FormContainerProps {
  children: React.ReactNode;
}

function FormContainer({ children }: FormContainerProps) {
  return (
    <PasswordShowProvider>
      <div className="container mx-auto mt-2 px-4">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md p-6">{children}</div>
        </div>
      </div>
    </PasswordShowProvider>
  );
}

FormContainer.LoginScreen = LoginScreen;
FormContainer.RegisterScreen = RegisterScreen;

export default FormContainer;
