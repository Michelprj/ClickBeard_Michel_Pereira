'use client';

import { destroyCookie, parseCookies, setCookie } from 'nookies';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/infrastructure/api/axios';
import AuthHTTPService from '@/infrastructure/services/AuthHTTPService';

import {
  IAuthProviderProps,
  IUser,
  IUserCredentials,
  SignInCredentials,
} from './interfaces';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): Promise<void>;
  authInfo: IUserCredentials;
  loading: boolean;
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: IAuthProviderProps) {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [authInfo, setAuthInfo] = useState({} as IUserCredentials);
  const [user, setUser] = useState({} as IUser);
  const MySwal = withReactContent(Swal);

  const signOut = useCallback(async () => {
    destroyCookie(null, 'user.token', { path: '/' });
    api.defaults.headers['Authorization'] = null;

    localStorage.removeItem('user');
    setAuthInfo({} as IUserCredentials);
    push('/');

    MySwal.fire({
      title: 'Logout realizado com sucesso!',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      showCloseButton: true,
      color: 'white',
      background: 'green',
    });
    setLoading(false);
  }, [push]);

  useEffect(() => {
    const token = parseCookies()['user.token'];
    if (token) {
      setLoading(true);
      try {
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          setUser(userData.user);
          setAuthInfo({ accessToken: token, user: userData.user });
          api.defaults.headers['Authorization'] = `Bearer ${token}`;
        } else {
          signOut();
        }
      } catch (error) {
        console.error('Session validation failed', error);
        signOut();
      } finally {
        setLoading(false);
      }
    }
  }, [signOut]);

  async function signIn({ email, password }: SignInCredentials) {
    setLoading(true);
    try {
      const response = await AuthHTTPService.signin(email, password);
      const { accessToken, user } = response.data;

      api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
      setAuthInfo({ accessToken, user });
      setCookie(null, 'user.token', accessToken, {
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });
      localStorage.setItem('user', JSON.stringify({ user }));
      setUser(user);
      push(`/home`);
      
      MySwal.fire({
        title: 'Login realizado com sucesso!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: true,
        color: 'white',
        background: 'green',
      });
    } catch (error: any) {
      MySwal.fire({
        title: 'Erro ao realizar login! Tente novamente.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        showCloseButton: true,
        color: 'white',
        background: '#b13838',
      });

      console.log(error.response.data.message);
      MySwal.fire({
        title: 'E-mail ou senha inválido!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: true,
        color: 'white',
        background: '#b13838',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        authInfo,
        signOut,
        loading,
        user,
        setUser,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
