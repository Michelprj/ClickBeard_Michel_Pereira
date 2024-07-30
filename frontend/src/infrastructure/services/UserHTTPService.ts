import { AxiosPromise } from 'axios';
import { api } from '../api/axios';

interface IUserHTTPService {
  update: (id: string, name: string, email: string, password?: string) => Promise<AxiosPromise<any>>;
  findOne: (id: string) => Promise<AxiosPromise<any>>;
}

const UserHTTPService: IUserHTTPService = {
  update: function (
    id: string,
    name: string,
    email: string,
    password?: string
  ): Promise<AxiosPromise<any>> {
    return api.patch(`user/${id}`, {
      name,
      email,
      password,
    });
  },
  findOne: function (id: string): Promise<AxiosPromise<any>> {
    return api.get(`user/${id}`);
  }
};

export default UserHTTPService;
