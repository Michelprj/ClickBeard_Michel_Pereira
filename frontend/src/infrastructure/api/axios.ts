import axios, { AxiosError } from 'axios';
import { destroyCookie, parseCookies } from 'nookies';

const { 'user.token': token } = parseCookies();

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,

  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      destroyCookie(undefined, 'user.token', {
        path: '/login',
      });

      api.defaults.headers['Authorization'] = null;
    }

    return Promise.reject(error);
  }
);
