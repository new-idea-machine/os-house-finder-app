import React, { createContext, useState, useMemo } from 'react';

export const PasswordShowContext = createContext({});

export function PasswordShowProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [isConfirmPasswordShow, setIsConfirmPasswordShow] =
    useState<boolean>(false);

  const value = useMemo(
    () => ({
      isPasswordShow,
      setIsPasswordShow,
      isConfirmPasswordShow,
      setIsConfirmPasswordShow,
    }),
    [isPasswordShow, isConfirmPasswordShow]
  );

  return (
    <PasswordShowContext.Provider value={value}>
      {children}
    </PasswordShowContext.Provider>
  );
}
