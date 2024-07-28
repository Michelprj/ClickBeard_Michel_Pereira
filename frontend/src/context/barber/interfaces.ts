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
