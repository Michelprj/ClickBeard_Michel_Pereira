import { AxiosPromise } from 'axios';
import { api } from '../api/axios';

interface IUserHTTPService {
  signin: (email: string, password: string) => Promise<AxiosPromise<any>>;
}

const AuthHTTPService: IUserHTTPService = {
  signin: function (
    email: string,
    password: string
  ): Promise<AxiosPromise<any>> {
    return api.post('auth/signin', {
      email: email,
      password: password,
    });
  },
};

export default AuthHTTPService;
