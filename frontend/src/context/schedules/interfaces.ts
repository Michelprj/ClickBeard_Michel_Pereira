import { ReactNode } from 'react';
import { IUser } from '../auth/interfaces';
import { IBarber } from '../barber/interfaces';

export interface ISchedules {
  id: string;
  time: Date;
  specialtyType: string[];
  users: IUser;
  barber: IBarber;
  isConfirmed?: boolean;
}

export interface ISchedulesProviderProps {
  children: ReactNode;
}

export interface CreateCredentials {
  barberId: string;
  time: Date;
  specialtyType: string[];
}

export interface UpdateCredentials {
  paramId: string;
  time: Date;
  specialtyType: string[];
}
