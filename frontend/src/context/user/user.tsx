 'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';

import {
  IUserProviderProps,
  UpdateCredentials,
} from './interfaces';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { IUser } from '../user/interfaces';
import UserHTTPService from '@/infrastructure/services/UserHTTPService';

type UserContextData = {
  update(credentials: UpdateCredentials): Promise<void>;
  findOne(id: string): Promise<void>;
  loading: boolean;
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const UserContext = createContext({} as UserContextData);

function UserProvider({ children }: IUserProviderProps) {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({} as IUser);
  const MySwal = withReactContent(Swal);

  const update = async ({ id, name, email, password }: UpdateCredentials) => {
    setLoading(true);

    try {
      await UserHTTPService.update(id, name, email, password);
      setUser({
        ...user,
        name,
        email
      });

      MySwal.fire({
        title: 'Dados atualizados com sucesso!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        showCloseButton: true,
        color: 'white',
        background: 'green',
      });

      push('/profile');
    } catch (error) {
      MySwal.fire({
        title: 'Erro ao atualizar os dados! Faça login novamente.',
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
  };

  const findOne = async (id: string) => {
    setLoading(true);

    try {
      const response = await UserHTTPService.findOne(id);
      
      setUser(response.data);
    } catch (error) {
      MySwal.fire({
        title: 'Erro ao buscar os dados!',
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
  };

  return (
    <UserContext.Provider
      value={{
        update,
        findOne,
        loading,
        user,
        setUser,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}


export { UserProvider };
