'use client';

import Header from "@/components/interface/header";
import { SchedulesContext } from "@/context/schedules/schedules";
import moment from "moment-timezone";
import { useContext, useEffect, useState } from "react";

export default function AllSchedules() {
  const { findAll } = useContext(SchedulesContext);
  const [todaySchedules, setTodaySchedules] = useState([]);
  const [upcomingSchedules, setUpcomingSchedules] = useState([]);

  useEffect(() => {
    const findAllSchedules = async () => {
      const response: any = await findAll();

      const specialtyMap: { [key: string]: string } = {
        hair: 'Corte de cabelo',
        beard: 'Barba',
        eyebrow: 'Sobrancelha'
      };

      const now = moment();
      const today = now.clone().startOf('day');
      const tomorrow = now.clone().endOf('day');

      const schedulesToday = response
        .filter((schedule: any) => moment(schedule.time).isBetween(today, tomorrow))
        .map((schedule: any) => formatSchedule(schedule, specialtyMap));

      const schedulesUpcoming = response
        .filter((schedule: any) => moment(schedule.time).isAfter(tomorrow))
        .map((schedule: any) => formatSchedule(schedule, specialtyMap));

      setTodaySchedules(schedulesToday);
      setUpcomingSchedules(schedulesUpcoming);
    };

    const formatSchedule = (schedule: any, specialtyMap: { [key: string]: string }) => {
      const specialtyTypeFormatted = schedule.specialtyType
        .map((specialty: string) => specialtyMap[specialty] || specialty)
        .join(', ');

      const time = moment(schedule.time).add(3, 'hours');

      return {
        ...schedule,
        specialtyType: specialtyTypeFormatted,
        time: time.format('DD-MM-YYYY') + ' às ' + time.format('HH:mm'),
      };
    }

    findAllSchedules();
  }, []);

  const renderSchedules = (schedules: any[], title: string) => (
    <div>
      <div className="bg-[#222] py-4 text-center rounded-t">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      {
        schedules.map((schedule: any, index) => (
          <div key={index} className={`bg-[#0D0D0D] flex justify-between items-center px-6 py-4 ${index !== schedules.length - 1 && 'border-b border-[#634518]'} rounded-b`}>
            <div className="space-y-1 text-sm">
              <h2><b>Data:</b> {schedule.time}</h2>
              <h2><b>Barbeiro:</b> {schedule.barber.name}</h2>
              <h2><b>Serviços:</b> {schedule.specialtyType}</h2>
              <h2><b>Cliente:</b> {schedule.users.name}</h2>
            </div>
          </div>
        ))
      }
    </div>
  );

  return (
    <div className="bg-[#181717] min-h-screen flex items-center justify-center">
      <Header />
      <div className="bg-[#0D0D0D] w-10/12 h-[650px] overflow-y-auto rounded">
        {todaySchedules.length > 0 && renderSchedules(todaySchedules, "Hoje")}
        {upcomingSchedules.length > 0 && renderSchedules(upcomingSchedules, "Próximos dias")}
        {todaySchedules.length === 0 && upcomingSchedules.length === 0 && (
          <div className="bg-[#0D0D0D] w-10/12 h-[650px] rounded flex items-center justify-center">
            <h1 className="text-2xl font-bold">Não há agendamentos</h1>
          </div>
        )}
      </div>
    </div>
  );
}
