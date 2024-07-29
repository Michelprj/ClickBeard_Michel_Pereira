import { AxiosPromise } from 'axios';
import { api } from '../api/axios';

interface IBarberHTTPService {
  create: (name: string, age: number, specialty: string[], hiringDate: Date) => Promise<AxiosPromise<any>>;
  findAll: () => Promise<AxiosPromise<any>>;
}

const BarberHTTPService: IBarberHTTPService = {
  create: function (
    name: string, age: number, specialty: string[], hiringDate: Date
  ): Promise<AxiosPromise<any>> {
    return api.post(`barber`, {
      name,
      age,
      specialty,
      hiringDate,
    });
  },
  findAll: function (): Promise<AxiosPromise<any>> {
    return api.get('barber');
  },
};

export default BarberHTTPService;
