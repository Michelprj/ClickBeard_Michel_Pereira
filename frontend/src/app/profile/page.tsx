"use client";

import Header from "@/components/interface/header";
import Image from "next/image";
import Input from "@/components/form/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoPersonSharp } from "react-icons/io5";
import { useAuth } from "@/context/auth/auth";
import { UserFormData, UserPasswordFormData, userPasswordSchema, userSchema } from "@/schemas/user";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/user/user";
import Loader from "@/components/elements/loader";

export default function Profile() {
  const { authInfo } = useAuth();
  const { update, findOne, user, loading } = useContext(UserContext);

  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const findOneUser = async () => {
      if (authInfo.user) {
        await findOne(String(authInfo?.user?.id));      
      }
    }

    findOneUser();
  }, [updated]);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmed, setShowPasswordConfirmed] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
    defaultValues: {
      name: user.name ? user.name : authInfo?.user?.name,
      email: user.email ? user.email : authInfo?.user?.email,
    },
  });

  const {
    control: controlPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword , isValid: isValidPassword },
  } = useForm<UserPasswordFormData>({
    resolver: zodResolver(userPasswordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: UserFormData) => {
    setUpdated(true);
    await update({
      id: authInfo?.user?.id,
      email: data.email,
      name: data.name
    });

    setUpdated(false);
  };

  const onSubmitPassword = async (data: UserPasswordFormData) => {
    setUpdated(true);
    await update({
      id: authInfo?.user?.id,
      password: data.password,
      name: user.name,
      email: user.email
    });

    setUpdated(false);
  }

  return (
    <main className="flex min-h-screen flex-col">
      <section className="flex min-h-screen flex-col justify-center items-center bg-black">
        <Header />
        <Image
          src="/background-login.png"
          alt="Image Login"
          layout="fill"
          objectFit="cover"
          className="z-10"
        />

        <div className="bg-[#0D0D0D] w-11/12 md:w-9/12 lg:w-7/12 rounded z-20 flex flex-col items-center overflow-x-auto max-h-[750px]">
          <div className="bg-[#222] py-4 rounded-t text-center w-full">
            <h1 className="text-2xl font-bold">Meu perfil</h1>
          </div>

          {authInfo?.user?.id ? (
          <>
            <div className="p-6 bg-[var(--secondary-color)] rounded-full mt-8">
              <IoPersonSharp className="text-white z-30" size={35} />
            </div>
            <h2 className="text-white text-lg font-semibold mt-2 mb-8">
              {authInfo?.user?.name}
            </h2>
  
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-11/12 md:w-9/12 lg:w-7/12 pb-12"
            >
              <div className="space-y-1">
                <h2 className="font-bold text-lg mb-6 text-center">
                  Editar dados
                </h2>
                <Input
                  label="Nome"
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  error={errors.name?.message}
                  control={control}
                />
                <Input
                  label="E-mail"
                  id="email"
                  type="text"
                  placeholder="Seu e-mail"
                  error={errors.email?.message}
                  control={control}
                />

              </div>
  
              <button
                type="submit"
                className={`w-full mt-8 py-2 font-semibold rounded ${
                  isValid
                    ? "hover:bg-white hover:text-black bg-[var(--primary-color)] text-white"
                    : "cursor-not-allowed bg-[#373737] text-[#999999]"
                }`}
                disabled={!isValid}
              >
                { loading ? <Loader />  : 'Atualizar' }
              </button>
            </form>

            <form
              onSubmit={handleSubmitPassword(onSubmitPassword)}
              className="w-11/12 md:w-9/12 lg:w-7/12 pb-12 mt-8"
            >
              <div className="space-y-1">
                <h2 className="font-bold text-lg mb-6 text-center">
                  Redefinir senha
                </h2>
                <Input
                  label="Senha"
                  id="password"
                  type="password"
                  placeholder="Digite a senha"
                  error={errorsPassword.password?.message}
                  control={controlPassword}
                  isPassword
                  onClick={() => setShowPassword(!showPassword)}
                  isText={showPassword}
                />
                <Input
                  label="Confirmar senha"
                  id="confirmPassword"
                  type="password"
                  placeholder="Digite a senha novamente"
                  error={errorsPassword.confirmPassword?.message}
                  control={controlPassword}
                  isPassword
                  onClick={() => setShowPasswordConfirmed(!showPasswordConfirmed)}
                  isText={showPasswordConfirmed}
                />
              </div>
  
              <button
                type="submit"
                className={`w-full mt-8 py-2 font-semibold rounded ${
                  isValidPassword
                    ? "hover:bg-white hover:text-black bg-[var(--primary-color)] text-white"
                    : "cursor-not-allowed bg-[#373737] text-[#999999]"
                }`}
                disabled={!isValidPassword}
              >
                { loading ? <Loader />  : 'Atualizar senha' }
              </button>
            </form>
          </>
          ) : (
            <p className="text-white text-lg font-semibold py-12">
              Usuário não encontrado
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
