'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';

import {
  CreateCredentials,
  ISchedules,
  ISchedulesProviderProps,
  UpdateCredentials,
} from './interfaces';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SchedulesHTTPService from '@/infrastructure/services/SchedulesHTTPService';

type SchedulesContextData = {
  create(credentials: CreateCredentials): Promise<void>;
  loading: boolean;
  schedule: ISchedules;
  setSchedule: Dispatch<SetStateAction<ISchedules>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  findAll(): Promise<void>;
  update(credentials: UpdateCredentials): Promise<void>;
};

export const SchedulesContext = createContext({} as SchedulesContextData);

function SchedulesProvider({ children }: ISchedulesProviderProps) {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState<ISchedules>({} as ISchedules);
  const MySwal = withReactContent(Swal);

  async function create({ barberId, time, specialty_type }: CreateCredentials) {
    setLoading(true);
    try {
      const response = await SchedulesHTTPService.create(barberId, time, specialty_type);
      const schedule = response.data;

      console.log('schedule', schedule);
      
      setSchedule(schedule);

      MySwal.fire({
        title: 'Agendamento realizado com sucesso!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        showCloseButton: true,
        color: 'white',
        background: 'green',
      });
    
    } catch (error: any) {
      console.log(error.response.data.message);
      MySwal.fire({
        title: error.response.data.message === "Booking time must be between 08:00 and 17:30" 
        ?  'O horário de reserva deve ser entre 08:00 e 17:30' 
        : error.response.data.message === "Barber not found" 
        ? 'Barbeiro não encontrado'
        : 'Esse horário já está reservado',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 8000,
        showCloseButton: true,
        color: 'white',
        background: '#b13838',
      });

    } finally {
      setLoading(false);
    }
  }

  const findAll = async () => {
    setLoading(true);
    try {
      const response = await SchedulesHTTPService.findAll();
      const schedules = response.data;
      return schedules;
    } catch (error: any) {
      MySwal.fire({
        title: 'Erro ao buscar agendamentos. Tente novamente.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 8000,
        showCloseButton: true,
        color: 'white',
        background: '#b13838',
      });

      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const update = async ({ paramId, time,  specialty_type }: UpdateCredentials) => {
    setLoading(true);
    try {
      const response = await SchedulesHTTPService.update(paramId, time, specialty_type);
      const schedule = response.data;

      setSchedule(schedule);

      MySwal.fire({
        title: 'Agendamento atualizado com sucesso!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        showCloseButton: true,
        color: 'white',
        background: 'green',
      });

    } catch (error: any) {
      console.log(error.response.data.message);
      MySwal.fire({
        title: error.response.data.message === "Booking time must be between 08:00 and 17:30" 
        ?  'O horário de reserva deve ser entre 08:00 e 17:30' 
        : error.response.data.message === "Barber not found" 
        ? 'Barbeiro não encontrado'
        : 'Esse horário já está reservado',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 8000,
        showCloseButton: true,
        color: 'white',
        background: '#b13838',
      });

    } finally {
      setLoading(false);
    }
}

  return (
    <SchedulesContext.Provider
      value={{
        create,
        loading,
        schedule,
        setSchedule,
        setLoading,
        findAll,
        update,
      }}
    >
      {children}
    </SchedulesContext.Provider>
  );
}


export default SchedulesProvider;
