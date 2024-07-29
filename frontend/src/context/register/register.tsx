'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import RegisterHTTPService from '@/infrastructure/services/RegisterHTTPService';

import {
  IRegisterProviderProps,
  IUser,
  SignUpCredentials,
} from './interfaces';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

type RegisterContextData = {
  signUp(credentials: SignUpCredentials): Promise<void>;
  loading: boolean;
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const RegisterContext = createContext({} as RegisterContextData);

function RegisterProvider({ children }: IRegisterProviderProps) {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({} as IUser);
  const MySwal = withReactContent(Swal);


  async function signUp({ name, email, password }: SignUpCredentials) {
    setLoading(true);
    try {
      const response = await RegisterHTTPService.signUp(name, email, password);
      const user = response.data;

      setUser(user);
      push(`/login`);
      
      MySwal.fire({
        title: 'Cadastro realizado com sucesso! Faça o login para acessar a plataforma.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 7000,
        showCloseButton: true,
        color: 'white',
        background: 'green',
      });
    } catch (error: any) {
      MySwal.fire({
        title: 'E-mail inserido já está em uso! Tente novamente com outro.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 8000,
        showCloseButton: true,
        color: 'white',
        background: '#b13838',
      });

      console.log(error.response.data?.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <RegisterContext.Provider
      value={{
        signUp,
        loading,
        user,
        setUser,
        setLoading,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}


export default RegisterProvider;
