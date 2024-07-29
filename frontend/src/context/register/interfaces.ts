import { ReactNode } from 'react';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  isadmin: boolean;
}

export interface IRegisterProviderProps {
  children: ReactNode;
}

export interface IUserCredentials {
  accessToken: string;
  users: IUser;
}

export interface SignUpCredentials {
  name: string,
  email: string;
  password: string;
}
