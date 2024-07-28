"use client";

import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import Swal from 'sweetalert2';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { FaPlus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import withReactContent from "sweetalert2-react-content";

export default function ComponentsAppsCalendar() {
  const now = new Date();
  const MySwal = withReactContent(Swal);  

  const getMonth = (dt: Date, add: number = 0) => {
    let month = dt.getMonth() + 1 + add;
    const str = (month < 10 ? "0" + month : month).toString();
    return str;
  };

  const [events, setEvents] = useState<any>([
    {
      id: 1,
      title: "All Day Event",
      start: now.getFullYear() + "-" + getMonth(now) + "-01T14:30:00",
      end: now.getFullYear() + "-" + getMonth(now) + "-02T14:30:00",
      className: "danger",
      description:
        "Aenean fermentum quam vel sapien rutrum cursus. Vestibulum imperdiet finibus odio, nec tincidunt felis facilisis eu.",
    },
    {
      id: 2,
      title: "Site Visit",
      start: now.getFullYear() + "-" + getMonth(now) + "-07T19:30:00",
      end: now.getFullYear() + "-" + getMonth(now) + "-08T14:30:00",
      className: "primary",
      description:
        "Etiam a odio eget enim aliquet laoreet. Vivamus auctor nunc ultrices varius lobortis.",
    },
    {
      id: 3,
      title: "Product Lunching Event",
      start: now.getFullYear() + "-" + getMonth(now) + "-17T14:30:00",
      end: now.getFullYear() + "-" + getMonth(now) + "-18T14:30:00",
      className: "info",
      description:
        "Proin et consectetur nibh. Mauris et mollis purus. Ut nec tincidunt lacus. Nam at rutrum justo, vitae egestas dolor.",
    },
    {
      id: 4,
      title: "Meeting",
      start: now.getFullYear() + "-" + getMonth(now) + "-12T10:30:00",
      end: now.getFullYear() + "-" + getMonth(now) + "-13T10:30:00",
      className: "danger",
      description:
        "Mauris ut mauris aliquam, fringilla sapien et, dignissim nisl. Pellentesque ornare velit non mollis fringilla.",
    },
    {
      id: 5,
      title: "Lunch",
      start: now.getFullYear() + "-" + getMonth(now) + "-12T15:00:00",
      end: now.getFullYear() + "-" + getMonth(now) + "-13T15:00:00",
      className: "info",
      description:
        "Integer fermentum bibendum elit in egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    },
    {
      id: 6,
      title: "Conference",
      start: now.getFullYear() + "-" + getMonth(now) + "-12T21:30:00",
      end: now.getFullYear() + "-" + getMonth(now) + "-13T21:30:00",
      className: "success",
      description:
        "Curabitur facilisis vel elit sed dapibus. Nunc sagittis ex nec ante facilisis, sed sodales purus rhoncus. Donec est sapien, porttitor et feugiat sed, eleifend quis sapien. Sed sit amet maximus dolor.",
    },
    {
      id: 7,
      title: "Happy Hour",
      start: now.getFullYear() + "-" + getMonth(now) + "-12T05:30:00",
      end: now.getFullYear() + "-" + getMonth(now) + "-13T05:30:00",
      className: "info",
      description:
        " odio lectus, porttitor molestie scelerisque blandit, hendrerit sed ex. Aenean malesuada iaculis erat, vitae blandit nisl accumsan ut.",
    },
    {
      id: 8,
      title: "Dinner",
      start: now.getFullYear() + "-" + getMonth(now) + "-12T20:00:00",
      end: now.getFullYear() + "-" + getMonth(now) + "-13T20:00:00",
      className: "danger",
      description:
        "Sed purus urna, aliquam et pharetra ut, efficitur id mi. Pellentesque ut convallis velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 9,
      title: "Birthday Party",
      start: now.getFullYear() + "-" + getMonth(now) + "-27T20:00:00",
      end: now.getFullYear() + "-" + getMonth(now) + "-28T20:00:00",
      className: "success",
      description:
        "Sed purus urna, aliquam et pharetra ut, efficitur id mi. Pellentesque ut convallis velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 10,
      title: "New Talent Event",
      start: now.getFullYear() + "-" + getMonth(now, 1) + "-24T08:12:14",
      end: now.getFullYear() + "-" + getMonth(now, 1) + "-27T22:20:20",
      className: "danger",
      description:
        "Sed purus urna, aliquam et pharetra ut, efficitur id mi. Pellentesque ut convallis velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 11,
      title: "Other new",
      start: now.getFullYear() + "-" + getMonth(now, -1) + "-13T08:12:14",
      end: now.getFullYear() + "-" + getMonth(now, -1) + "-16T22:20:20",
      className: "primary",
      description:
        "Pellentesque ut convallis velit. Sed purus urna, aliquam et pharetra ut, efficitur id mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 13,
      title: "Upcoming Event",
      start: now.getFullYear() + "-" + getMonth(now, 1) + "-15T08:12:14",
      end: now.getFullYear() + "-" + getMonth(now, 1) + "-18T22:20:20",
      className: "primary",
      description:
        "Pellentesque ut convallis velit. Sed purus urna, aliquam et pharetra ut, efficitur id mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ]);
  const [isAddEventModal, setIsAddEventModal] = useState(false);
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
    let params = JSON.parse(JSON.stringify(defaultParams));
    setParams(params);
    if (data) {
      let obj = JSON.parse(JSON.stringify(data.event));
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
    let obj = {
      event: {
        start: data.start,
        end: data.end,
      },
    };
    editEvent(obj);
  };

  const saveEvent = () => {
    showMessage();
    setIsAddEventModal(false);
  };

  const adjustMinutes = (dateStr: string) => {
    const date = new Date(dateStr);
    const minutes = date.getMinutes();
    if (minutes !== 0 && minutes !== 30) {
      date.setMinutes(minutes < 30 ? 0 : 30);
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

  const showMessage = () => {
    MySwal.fire({
      title: 'Agendamento realizado com sucesso!',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 4000,
      showCloseButton: true,
      color: 'white',
      background: 'green',
    });
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
            timeZone="America/Sao_Paulo"
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
                          className="form-input bg-[#222] py-2 px-3 rounded-md text-white"
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
