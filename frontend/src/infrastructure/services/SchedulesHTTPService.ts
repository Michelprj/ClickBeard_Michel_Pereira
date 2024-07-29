import { AxiosPromise } from 'axios';
import { api } from '../api/axios';

interface ISchedulesHTTPService {
  create: (barberId: string, time: Date, specialtyType: string[]) => Promise<AxiosPromise<any>>;
  findAll: () => Promise<AxiosPromise<any>>;
  update: (paramId: string, time: Date, specialtyType: string[]) => Promise<AxiosPromise<any>>;
  cancelSchedule: (paramId: string) => Promise<AxiosPromise<any>>;
}

const SchedulesHTTPService: ISchedulesHTTPService = {
  create: function (
    barberId: string,
    time: Date,
    specialtyType: string[]
  ): Promise<AxiosPromise<any>> {
    return api.post(`booking/${barberId}`, {
      time,
      specialtyType,
    });
  },
  findAll: function (): Promise<AxiosPromise<any>> {
    return api.get('booking');
  },
  update: function (
    paramId: string,
    time: Date,
    specialtyType: string[]
  ): Promise<AxiosPromise<any>> {
    return api.patch(`booking/${paramId}`, {
      time,
      specialtyType,
    });
  },
  cancelSchedule: function (paramId: string): Promise<AxiosPromise<any>> {
    return api.patch(`booking/${paramId}/confirm`);
  }
};

export default SchedulesHTTPService;
