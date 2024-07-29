import { ReactNode } from 'react';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  isadmin: boolean;
}

export interface IAuthProviderProps {
  children: ReactNode;
}

export interface IUserCredentials {
  accessToken: string;
  user: IUser;
}

export interface SignInCredentials {
  email: string;
  password: string;
}
