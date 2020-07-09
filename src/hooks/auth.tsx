import React, { createContext, useContext, useCallback, useState } from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  signed: boolean;
}

interface AuthProviderData {
  children: React.ReactChild | React.ReactChildren;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderData> = ({
  children,
}: AuthProviderData) => {
  const [signed, setSigned] = useState(() => {
    const verify = !!localStorage.getItem('@Adopets:token');

    return verify;
  });

  const signIn = async ({ email, password }: SignInCredentials) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token } = response.data;
    if (token) {
      localStorage.setItem('@Adopets:token', token);
      setSigned(true);
    }
  };

  const signOut = useCallback(() => {
    localStorage.removeItem('@Adopets:token');
    setSigned(false);
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, signed }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  // console.log(localStorage.getItem('@Adopets:token'));

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export { AuthProvider, useAuth };
