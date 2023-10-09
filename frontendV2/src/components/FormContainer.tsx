import LoginScreen from '@pages/LoginScreen';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { PasswordShowProvider } from '@/context/PasswordShowProvider';

interface FormContainerProps {
  children: React.ReactNode;
}

function FormContainer({ children }: FormContainerProps) {
  return (
    <PasswordShowProvider>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </PasswordShowProvider>
  );
}

FormContainer.LoginScreen = LoginScreen;

export default FormContainer;
