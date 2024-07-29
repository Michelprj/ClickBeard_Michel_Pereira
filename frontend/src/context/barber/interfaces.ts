import { ReactNode } from "react";

export interface IBarber {
  id: string;
  name: string;
  age: number;
  hiringDate: Date;
  specialty: string[];
}

export interface IBarberProviderProps {
  children: ReactNode;
}

export interface CreateCredentials {
  name: string;
  age: number;
  specialty: string[];
  hiringDate: Date;
}