import { ReactNode } from 'react';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface IRegisterProviderProps {
  children: ReactNode;
}

export interface IUserCredentials {
  accessToken: string;
  user: IUser;
}

export interface SignUpCredentials {
  name: string,
  email: string;
  password: string;
}
