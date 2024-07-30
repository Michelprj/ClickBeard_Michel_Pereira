import { ReactNode } from 'react';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface IUserProviderProps {
  children: ReactNode;
}

export interface UpdateCredentials {
  id: string;
  name: string;
  email: string;
  password?: string;
}