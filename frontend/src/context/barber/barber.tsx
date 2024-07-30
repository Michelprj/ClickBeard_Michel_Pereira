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
  IBarber,
  IBarberProviderProps,
} from './interfaces';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import BarberHTTPService from '@/infrastructure/services/BarberHTTPService';

type BarberContextData = {
  create(credentials: CreateCredentials): Promise<void>;
  loading: boolean;
  barber: IBarber;
  setBarber: Dispatch<SetStateAction<IBarber>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  findAll(): Promise<void>;
};

export const BarberContext = createContext({} as BarberContextData);

function BarberProvider({ children }: IBarberProviderProps) {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [barber, setBarber] = useState<IBarber>({} as IBarber);
  const MySwal = withReactContent(Swal);

  async function create({ name, age, specialty, hiringDate }: CreateCredentials) {
    setLoading(true);
    try {
      const response = await BarberHTTPService.create(name, age, specialty, hiringDate);
      const barber = response.data;
      
      setBarber(barber);

      MySwal.fire({
        title: 'Barbeiro cadastrado com sucesso!',
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
        title: error.response.data.message === 'User not found' 
        ? 'Usuário não encontrado.' 
        : 'Você não tem permissão para cadastrar barbeiros.',
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
      const response = await BarberHTTPService.findAll();
      const barber = response.data;
      return barber;
    } catch (error: any) {
      MySwal.fire({
        title: 'Erro ao buscar barbeiros.',
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

  return (
    <BarberContext.Provider
      value={{
        create,
        loading,
        barber,
        setBarber,
        setLoading,
        findAll,
      }}
    >
      {children}
    </BarberContext.Provider>
  );
}


export default BarberProvider;
