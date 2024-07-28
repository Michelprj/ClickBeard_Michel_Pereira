import { AxiosPromise } from 'axios';
import { api } from '../api/axios';

interface IBarberHTTPService {
  create: (name: string, age: number, specialty: string[]) => Promise<AxiosPromise<any>>;
  findAll: () => Promise<AxiosPromise<any>>;
}

const BarberHTTPService: IBarberHTTPService = {
  create: function (
    name: string, age: number, specialty: string[]
  ): Promise<AxiosPromise<any>> {
    return api.post(`barber`, {
      name,
      age,
      specialty,
    });
  },
  findAll: function (): Promise<AxiosPromise<any>> {
    return api.get('barber');
  },
};

export default BarberHTTPService;
