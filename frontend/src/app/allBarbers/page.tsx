'use client';

import Modal from "@/components/elements/modal";
import Header from "@/components/interface/header";
import { BarberContext } from "@/context/barber/barber";
import { IBarber } from "@/context/barber/interfaces";
import moment from "moment-timezone";
import { useContext, useEffect, useState } from "react";

export default function AllBarbers() {
  const { findAll, remove } = useContext(BarberContext);
 
  const [barbers, setBarbers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const findAllBarber = async () => {
      const response: any= await findAll();

      const specialtyMap: { [key: string]: string } = {
        hair: 'Corte de cabelo',
        beard: 'Barba',
        eyebrow: 'Sobrancelha'
      };

      const responseFormatted = response.map((barber: IBarber) => {
        const specialtyFormatted = barber.specialty
          .map((specialty: string) => specialtyMap[specialty] || specialty)
          .join(', ');
      
        return {
          ...barber,
          specialty: specialtyFormatted,
          hiringDate: moment(barber.hiringDate).format('DD-MM-YYYY'),
        };
      });
    
      setBarbers(responseFormatted);
    };

    findAllBarber();
  }, [isModalOpen]);

  const removeBarber = async (id: string) => {
    await remove(id);
    setIsModalOpen(false);
  }

  return (
    <div className="bg-[#181717] min-h-screen flex items-center justify-center">
      <Header />
      {
        barbers.length === 0 ? (
          <div className="bg-[#0D0D0D] w-10/12 h-[650px] rounded flex items-center justify-center">
            <h1 className="text-2xl font-bold">Não possuem barbeiros cadastrados</h1>
          </div>
        ) : (
          <div className="bg-[#0D0D0D] w-11/12 lg:w-10/12 min-h-5/6 my-20 overflow-y-auto rounded">
            <div className="bg-[#222] py-4 text-center rounded-t">
              <h1 className="text-2xl font-bold">Barbeiros</h1>
            </div>

              { barbers.map((barber: IBarber, index) => (
              <div key={index}>
                <div  className={`bg-[#0D0D0D] flex flex-col lg:flex-row space-y-8 lg:space-y-none justify-between items-center px-6 py-4 
                  ${ index !== barbers.length - 1 && 'border-b border-[#634518]'} rounded-b`}>
                  <div className="space-y-1 text-sm">
                    <h2><b>Nome:</b> { barber.name }</h2>
                    <h2><b>Idade:</b> { barber.age }</h2>
                    <h2><b>Data de contratação:</b> { String(barber.hiringDate) }</h2>
                    <h2><b>Especialidades:</b> { barber.specialty }</h2>
                  </div>
                  
                  <button
                    className="bg-[var(--primary-color)] text-white font-semibold px-4 py-2 rounded"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Excluir barbeiro
                  </button>
                </div>
                  { isModalOpen && 
                    <Modal 
                      open={isModalOpen}
                      setOpen={setIsModalOpen}
                      onDeleteModal={() => removeBarber(String(barber.id))}
                      textMain="Deseja excluir esse barbeiro?"
                      titleModal="Excluir barbeiro"
                      buttonPrincipalText="Excluir"
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
