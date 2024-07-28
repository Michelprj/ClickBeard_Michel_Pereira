import { AxiosPromise } from 'axios';
import { api } from '../api/axios';

interface ISchedulesHTTPService {
  create: (barberId: string, time: Date, specialty_type: string[]) => Promise<AxiosPromise<any>>;
  findAll: () => Promise<AxiosPromise<any>>;
}

const SchedulesHTTPService: ISchedulesHTTPService = {
  create: function (
    barberId: string,
    time: Date,
    specialty_type: string[]
  ): Promise<AxiosPromise<any>> {
    return api.post(`booking/${barberId}`, {
      time,
      specialty_type,
    });
  },
  findAll: function (): Promise<AxiosPromise<any>> {
    return api.get('booking');
  }
};

export default SchedulesHTTPService;
