'use client';

import Header from "@/components/interface/header";
import Image from "next/image";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import Loader from "@/components/elements/loader";
import Input from "@/components/form/login/input";
import { RegisterContext } from "@/context/register/register";
import { RegisterFormData, registerSchema } from "@/schemas/register";

export default function Register() {
  const { signUp, loading } = useContext(RegisterContext);

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data:RegisterFormData) => {
    await signUp({ name: data.name, email: data.email, password: data.password });
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <main className="flex min-h-screen flex-col justify-center items-center bg-black">
      <Header />
      <Image src="/background-login.png" alt="Image Fundo" layout="fill" objectFit="cover" className="z-10" />

      <div className="relative z-20 bg-[var(--primary-color)] w-11/12 sm:w-9/12 md:w-7/12 lg:w-6/12 xl:w-4/12 p-6 rounded">
        <h1 className="text-black text-center text-2xl font-semibold mb-6">Cadastro</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Nome"
            id="name"
            type="text"
            placeholder="Digite seu nome"
            error={errors.name?.message}
            control={control}
          />
          <Input
            label="E-mail"
            id="email"
            type="text"
            placeholder="Digite seu e-mail"
            error={errors.email?.message}
            control={control}
          />
          <Input
            label="Senha"
            id="password"
            type="password"
            placeholder="Digite sua senha"
            error={errors.password?.message}
            control={control}
            isPassword
            isText={showPassword}
            onClick={toggleShowPassword}
          />
          <button 
            type="submit" 
            className={`${!isValid 
              ? 'bg-[#373737] text-black hover:cursor-not-allowed' 
              : 'bg-black text-white' } w-full py-2 rounded font-semibold`}
            disabled={!isValid}
          >
            {loading ? <Loader /> : 'Cadastrar'}
          </button>
        </form>
      </div>
    </main>
  );
}
