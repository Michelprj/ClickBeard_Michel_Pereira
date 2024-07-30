import { ReactNode } from 'react';

export interface IRegisterProviderProps {
  children: ReactNode;
}

export interface SignUpCredentials {
  name: string,
  email: string;
  password: string;
}
