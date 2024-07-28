"use client";

import { Transition, Dialog } from "@headlessui/react";
import { Fragment, use, useContext, useEffect, useState } from "react";
import Swal from 'sweetalert2';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { FaPlus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import withReactContent from "sweetalert2-react-content";
import { SchedulesContext } from "@/context/schedules/schedules";
import { ISchedules } from "@/context/schedules/interfaces";

export default function ComponentsAppsCalendar() {
  const { create, findAll: findAllSchedules } = useContext(SchedulesContext);
  
  const now = new Date();
  const MySwal = withReactContent(Swal);

  const getMonth = (dt: Date, add: number = 0) => {
    let month = dt.getMonth() + 1 + add;
    const str = (month < 10 ? "0" + month : month).toString();
    return str;
  };
  
  const [isAddEventModal, setIsAddEventModal] = useState(false);
  const [events, setEvents] = useState<any>([]);
  const [bookingCreated, setBookingCreated] = useState(false);

  useEffect(() => {
    const findAll = async () => {
      const response: any = await findAllSchedules();
      const eventsAll = response.map((schedule: ISchedules) => {
        console.log('schedule', schedule.time);
        
        const startDate = new Date(schedule.time);
        startDate.setHours(startDate.getHours() + 3);
        console.log('startDate', startDate);
        
        const endDate = new Date(startDate);
        endDate.setMinutes(startDate.getMinutes() + 30);
        return {
          id: schedule.id,
          title: schedule.user.name,
          start: startDate,
          end: endDate,
          classNames: "",
          description: "",
        };
      });
      setEvents(eventsAll);
      return eventsAll;
    }
    findAll();
  }, [bookingCreated]);

  const [minStartDate, setMinStartDate] = useState<any>("");
  const [minEndDate, setMinEndDate] = useState<any>("");
  const defaultParams = {
    id: null,
    title: "",
    start: "",
    end: "",
    description: "",
    type: "primary",
  };
  const [params, setParams] = useState<any>(defaultParams);

  const dateFormat = (dt: any) => {
    dt = new Date(dt);
    const month =
      dt.getMonth() + 1 < 10 ? "0" + (dt.getMonth() + 1) : dt.getMonth() + 1;
    const date = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
    const hours = dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours();
    const mins = dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes();
    dt = dt.getFullYear() + "-" + month + "-" + date + "T" + hours + ":" + mins;
    return dt;
  };

  const editEvent = (data: any = null) => {
    const params = JSON.parse(JSON.stringify(defaultParams));
    setParams(params);
    if (data) {
      const obj = JSON.parse(JSON.stringify(data.event));
      setParams({
        id: obj.id ? obj.id : null,
        title: obj.title ? obj.title : null,
        start: dateFormat(obj.start),
        end: dateFormat(obj.end),
        type: obj.classNames ? obj.classNames[0] : "primary",
        description: obj.extendedProps ? obj.extendedProps.description : "",
      });
      setMinStartDate(new Date());
      setMinEndDate(dateFormat(obj.start));
    } else {
      setMinStartDate(new Date());
      setMinEndDate(new Date());
    }
    setIsAddEventModal(true);
  };

  const editDate = (data: any) => {
    const obj = {
      event: {
        start: data.start,
        end: data.end,
      },
    };
    editEvent(obj);
  };

  const saveEvent = async () => {
    setBookingCreated(false);
    const localDate = new Date(params.start);
    const adjustedDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
    
    await create({
      barberId: '1',
      time: adjustedDate,
      specialty_type: ['hair'],
    });
    
    setBookingCreated(true);
    setIsAddEventModal(false);  
  };

  const adjustMinutes = (dateStr: string) => {
    const date = new Date(dateStr);
    const minutes = date.getMinutes();
    if (minutes !== 0 && minutes !== 30) {
      date.setMinutes(minutes < 30 ? 0 : 30);
      MySwal.fire({
        title: 'Os agendamentos são feitos em intervalos de 30 minutos',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 8000,
        showCloseButton: true,
        color: 'white',
        background: '#b49100',
      });
    }
    return dateFormat(date);
  };

  const dateChange = (event: any) => {
    const dateStr = event.target.value;
    if (dateStr) {
      const adjustedDate = adjustMinutes(dateStr);
      setMinEndDate(adjustedDate);
      setParams({ ...params, start: adjustedDate, end: "" });
    }
  };

  return (
    <div className="px-20 py-24">
      <div className="panel mb-5">
        <div className="mb-4 flex flex-col items-center justify-center sm:flex-row sm:justify-between">
          <div className="mt-2">
            <div className="flex items-center mr-4">
              <div className="h-2.5 w-2.5 rounded-sm bg-[var(--primary-color)] mr-2"></div>
              <div>Agendamentos</div>
            </div>
          </div>
          <button
            type="button"
            className="bg-[var(--primary-color)] text-white px-4 py-2 rounded flex items-center font-semibold hover:text-black"
            onClick={() => editEvent()}
          >
            <FaPlus className="mr-4" />
            Agendar
          </button>
        </div>

        <div className="calendar-wrapper">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridDay"
            eventTextColor="#ffffff"
            eventColor="var(--primary-color)"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            editable={true}
            dayMaxEvents={true}
            selectable={true}
            droppable={true}
            nowIndicator={true}
            eventClick={(event: any) => editEvent(event)}
            select={(event: any) => editDate(event)}
            events={events}
            locale={"pt-br"}
          />
        </div>
      </div>

      <Transition appear show={isAddEventModal} as={Fragment}>
        <Dialog
          as="div"
          onClose={() => setIsAddEventModal(false)}
          open={isAddEventModal}
          className="relative z-50"
        >
          <Transition.Child
            as={Fragment}
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <Dialog.Description className="fixed inset-0 bg-[black]/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center px-4 py-8">
              <Transition.Child
                as={Fragment}
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                {/* modal event */}
                <Dialog.Panel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black relative">
                  <button
                    type="button"
                    className="absolute top-3 text-gray-400 outline-none right-6"
                    onClick={() => setIsAddEventModal(false)}
                  >
                    <MdClose color="white" size={28} />
                  </button>
                  <div className="bg-[#222] text-white py-3 text-lg font-semibold pl-6 pr-5">
                    {params.id ? "Editar evento" : "Adicionar evento"}
                  </div>
                  <div className="p-5 bg-[#191919] text-white">
                    <form className="space-y-5">
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="dateStart" className="text-sm font-bold">Data e hora</label>
                        <input
                          id="start"
                          type="datetime-local"
                          name="start"
                          className="bg-[#222] py-2 px-3 rounded text-white"
                          placeholder="Escolha uma data"
                          value={params.start || ""}
                          min={minStartDate}
                          onChange={(event: any) => dateChange(event)}
                          required
                          step={1800}
                        />
                        <div
                          className="mt-2 text-danger"
                          id="startDateErr"
                        ></div>
                      </div>

                      <div className="!mt-8 flex items-center justify-end space-x-4">
                        <button
                          type="button"
                          className="bg-transparent text-white border border-[var(--primary-color)] px-4 py-2 rounded font-semibold hover:bg-white hover:text-black"
                          onClick={() => setIsAddEventModal(false)}
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          onClick={() => saveEvent()}
                          className="bg-[var(--primary-color)] text-white px-4 py-2 rounded font-semibold hover:text-black"
                        >
                          {params.id ? "Atualizar agendamento" : "Criar agendamento"}
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
