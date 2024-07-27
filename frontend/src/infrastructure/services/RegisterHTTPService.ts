import { AxiosPromise } from 'axios';
import { api } from '../api/axios';

interface IUserHTTPService {
  signUp: (name: string, email: string, password: string) => Promise<AxiosPromise<any>>;
}

const RegisterHTTPService: IUserHTTPService = {
  signUp: function (
    name: string,
    email: string,
    password: string
  ): Promise<AxiosPromise<any>> {
    return api.post('auth/signup', {
      name,
      email,
      password,
    });
  },
};

export default RegisterHTTPService;
