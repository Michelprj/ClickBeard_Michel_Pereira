import { ReactNode } from 'react';
import { IUser } from '../auth/interfaces';
import { IBarber } from '../barber/interfaces';

export interface ISchedules {
  id: string;
  time: Date;
  specialty_type: string[];
  user: IUser;
  barber: IBarber;
}

export interface ISchedulesProviderProps {
  children: ReactNode;
}

export interface CreateCredentials {
  barberId: string;
  time: Date;
  specialty_type: string[];
}

export interface UpdateCredentials {
  paramId: string;
  time: Date;
  specialty_type: string[];
}
