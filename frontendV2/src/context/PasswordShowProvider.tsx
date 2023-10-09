import React, { createContext, useState, useMemo } from 'react';

type PasswordShowContextType = {
  isPasswordShow: boolean;
  setIsPasswordShow: React.Dispatch<React.SetStateAction<boolean>>;
  isConfirmPasswordShow: boolean;
  setIsConfirmPasswordShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PasswordShowContext = createContext<PasswordShowContextType>({
  isPasswordShow: false,
  setIsPasswordShow: () => {},
  isConfirmPasswordShow: false,
  setIsConfirmPasswordShow: () => {},
});

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
