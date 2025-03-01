'use client';

import Modal from "@/components/elements/modal";
import Header from "@/components/interface/header";
import { useAuth } from "@/context/auth/auth";
import { ISchedules } from "@/context/schedules/interfaces";
import { SchedulesContext } from "@/context/schedules/schedules";
import moment from "moment-timezone";
import { useContext, useEffect, useState } from "react";

export default function MySchedule() {
  const { authInfo } = useAuth();
  const { findAll, cancelSchedule } = useContext(SchedulesContext);
 
  const [schedules, setSchedules] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const findAllSchedules = async () => {
      const response: any = await findAll();
      const mySchedule = response.filter((schedule: ISchedules) => schedule.users.id === authInfo?.user?.id && schedule.isConfirmed === true);

      const specialtyMap: { [key: string]: string } = {
        hair: 'Corte de cabelo',
        beard: 'Barba',
        eyebrow: 'Sobrancelha'
      };
    
      const myScheduleFormatted = mySchedule.map((schedule: any) => {
        const specialtyTypeFormatted = schedule.specialtyType
          .map((specialty: string) => specialtyMap[specialty] || specialty)
          .join(', ');
    
        const time = moment(schedule.time).add(3, 'hours');
    
        return {
          ...schedule,
          specialtyType: specialtyTypeFormatted,
          time: time.format('DD-MM-YYYY') + ' às ' + time.format('HH:mm'),
        };
      });
    
      setSchedules(myScheduleFormatted);
    };

    findAllSchedules();
  }, [isModalOpen]);

  const cancelScheduleById = async (id: string) => {
    await cancelSchedule(id);

    setIsModalOpen(false);
  }

  return (
    <div className="bg-[#181717] min-h-screen h-screen flex items-center justify-center">
      <Header />
      {
        schedules.length === 0 ? (
          <div className="bg-[#0D0D0D] w-10/12 h-4/6 rounded flex items-center justify-center">
            <h1 className="text-2xl font-bold">Você não possui agendamentos</h1>
          </div>
        ) : (
          <div className="bg-[#0D0D0D] w-11/12 lg:w-10/12 overflow-y-auto mt-24 min-h-5/6 h-5/6 rounded">
            <div className="bg-[#222] py-4 text-center rounded-t">
              <h1 className="text-2xl font-bold">Meus agendamentos</h1>
            </div>

              { schedules.map((schedule: any, index) => (
              <div key={index}>
                <div  className={`bg-[#0D0D0D] flex flex-col lg:flex-row space-y-8 lg:space-y-none justify-between items-center px-6 py-4 
                  ${ index !== schedules.length - 1 && 'border-b border-[#634518]'} rounded-b`}>
                  <div className="space-y-1 text-sm">
                    <h2><b>Data:</b> { schedule.time }</h2>
                    <h2><b>Barbeiro:</b> { schedule.barber.name }</h2>
                    <h2><b>Serviços:</b> { schedule.specialtyType }</h2>
                  </div>

                  <button
                    className="bg-[var(--primary-color)] text-white font-semibold px-4 py-2 rounded"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Cancelar agendamento
                  </button>
                </div>
                  { isModalOpen && 
                    <Modal 
                      open={isModalOpen}
                      setOpen={setIsModalOpen}
                      onDeleteModal={() => cancelScheduleById(String(schedule.id))}
                      textMain="Deseja realmente cancelar o agendamento?"
                      titleModal="Cancelar agendamento"
                      buttonPrincipalText="Cancelar agendamento"
                    />
                  }
              </div>
                ))
              }            
            </div>
        )
      }

    </div>
  )
}
