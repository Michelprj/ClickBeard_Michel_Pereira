import { ReactNode } from 'react';
import { IUser } from '../user/interfaces';

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
