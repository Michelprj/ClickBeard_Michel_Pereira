'use client';

import Header from "@/components/interface/header";
import Image from "next/image";
import Input from "@/components/form/input";
import { useForm } from "react-hook-form";
import { RegisterBarberFormData, registerBarberSchema } from "@/schemas/registerBarber";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { BarberContext } from "@/context/barber/barber";
import CustomSelectRegisterBarber from "@/components/form/select/selectBox/registerBarber";

export default function RegisterBarber() {
  const { create } = useContext(BarberContext);
  
  const defaultParams = {
    start: "",
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
  const adjustMinutes = (dateStr: string) => {
    const date = new Date(dateStr);
    const hour = date.getHours();
    date.setHours(hour + 3);
    return dateFormat(date);
  };
  const dateChange = (event: any) => {
    const dateStr = event.target.value;
    if (dateStr) {
      const adjustedDate = adjustMinutes(dateStr);
      setParams({ ...params, start: new Date(adjustedDate) });
    }
  };

  const serviceOptions = [
    { value: "hair", label: "Corte de cabelo" },
    { value: "beard", label: "Barba" },
    { value: "eyebrow", label: "Sobrancelha" },
  ];

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<RegisterBarberFormData>({
    resolver: zodResolver(registerBarberSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: '',
      specialty: [],
    },
  });

  const onSubmit = async (data: RegisterBarberFormData) => {
    await create({ name: data.name, age: +data.age, specialty: data.specialty, hiringDate: params.start });
    setValue('name', '');
    setValue('age', '');
    setValue('specialty', []);
    setParams(defaultParams);
  };

  return (
    <main className="flex min-h-screen flex-col">
      <section className="flex min-h-screen flex-col justify-center items-center bg-black">
        <Header />
        <Image src="/background-login.png" alt="Image Login" layout="fill" objectFit="cover" className="z-10" />

        <div className="bg-[#0D0D0D] w-11/12 md:w-9/12 lg:w-7/12 rounded z-20 flex flex-col items-center">
          <div className="bg-[#222] py-4 rounded-t text-center w-full">
            <h1 className="text-2xl font-bold">Cadastrar barbeiros</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="w-11/12 md:w-9/12 lg:w-7/12 py-12">
            <div className="space-y-1">
              <Input
                label="Nome"
                id="name"
                type="type"
                placeholder="Digite o nome do barbeiro"
                error={errors.name?.message}
                control={control}
              />
              <Input
                label="Idade"
                id="age"
                type="number"
                placeholder="Digite a idade do barbeiro"
                error={errors.age?.message}
                control={control}
              />

              <CustomSelectRegisterBarber
                label="Especialidade"
                name="specialty"
                options={serviceOptions}
                control={control}
                error={errors.specialty?.message}
              />

              <div className="flex flex-col space-y-2">
                <label htmlFor="dateStart" className="text-sm font-bold">Data de contratação</label>
                <input
                  id="start"
                  type="date"
                  name="start"
                  className={`bg-[#222] py-2.5 px-3 rounded ${params.start === '' ? 'text-[#999999]' : 'text-white'} text-sm`}
                  placeholder="Escolha uma data"
                  onChange={(event: any) => dateChange(event)}
                  required
                />
                <div
                  className="mt-2 text-danger"
                  id="startDateErr"
                ></div>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full mt-8 py-2 font-semibold bg-[var(--primary-color)] text-white rounded ${
                isValid ? 'hover:bg-white hover:text-black' : 'cursor-not-allowed bg-[#373737]'
              }`}
              disabled={!isValid} 
            >
              Cadastrar
            </button>
          </form>
          
        </div>
      </section>
    </main>
  );
}
