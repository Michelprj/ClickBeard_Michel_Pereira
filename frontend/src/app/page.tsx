'use client';

import Header from "@/components/interface/header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { valuesList } from "@/mocks/values.mock";
import { barbers } from "@/mocks/barbers.mock";
import Footer from "@/components/interface/footer";
import { useAuth } from "@/context/auth/auth";

export default function Home() {
  const { push } = useRouter();
  const { authInfo } = useAuth()

  return (
    <main className="flex min-h-screen flex-col">
      <section id="home" className="flex min-h-screen flex-col justify-center items-center bg-black">
        <Header isHome />
        <Image src="/background-login.png" alt="Image Login" layout="fill" objectFit="cover" className="z-10" />

        <div className="z-20 flex flex-col gap-2 items-start px-6 md:px-20 lg:px-8 max-w-[1024px]">
          <h1 className="text-2xl font-bold">Agende seu corte na Clickbeard</h1>
          <h2 className="text-xl font-semibold">Transformamos seu estilo com precisão e dedicação. Venha para um corte que reflete quem você realmente é.</h2>

          <button
            className="bg-[var(--primary-color)] text-black font-semibold hover:text-white px-4 py-2 rounded mt-4"
            onClick={() => push(authInfo?.accessToken ? '/toShedule' : '/login')}
          >Agende seu horário</button>
        </div>
      </section>

      <section id="values" className="flex min-h-screen flex-col justify-around items-start bg-[var(--primary-color)] relative">
        <div className="flex flex-col justify-center px-6 md:px-20 lg:px-8 w-full space-y-16 py-20">
          <h1 className="text-2xl lg:text-3xl font-bold text-black text-center">Valores dos nossos serviços</h1>

          <div className="w-full flex flex-wrap justify-center gap-12 py-8">
            { valuesList.map(({ title, price, description }, index) => (
              <div key={index} className="bg-[var(--card-color)] h-[300px] py-8 w-60 text-black space-y-2 flex 
                  flex-col items-center justify-between rounded-lg shadow-lg">
                <div>
                  <h1 className="text-lg">{title}</h1>
                  <p className="text-3xl font-bold">R$ {price}</p>
                  { description.length > 0 && (
                      description.map((valueDescription, indexDescription) => (
                      <ul key={indexDescription} className="font-semibold list-disc list-inside">
                        <li>{valueDescription}</li>
                      </ul>
                  )))}
                </div>

                <button 
                  className="bg-black text-white font-bold px-8 py-2 rounded hover:text-black hover:bg-white"
                  onClick={() => push('/login')}
                >
                  Agendar
                </button>
              </div>
              )
            )}
          </div>
          <Image src="/razor-values.svg" alt="Image razor" width={300} height={300} className="absolute bottom-0 right-0 xl:right-80"/>
        </div>
      </section>

      <section id="barbers" className="flex min-h-screen flex-col justify-around items-start bg-[var(--secondary-color)]">
        <div className="flex flex-col justify-center px-6 md:px-20 lg:px-8 w-full space-y-16 py-20">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-black text-center">Nossos Barbeiros</h1>
            <p className="text-xl font-semibold text-center text-black">Conheça os nossos barbeiros, mestres em transformar seu estilo com precisão e criatividade!</p>
          </div>

          <div className="w-full flex flex-wrap justify-center gap-12 py-8">
            { barbers.map(({ name, profile }, index) => (
              <div key={index} className="bg-[var(--card-color)] h-[300px] py-8 w-60 text-black flex flex-col items-center justify-between rounded-lg shadow-lg">
                <Image src={profile} alt="Image barber" width={120} height={120} />
                <h1 className="text-xl font-semibold">{name}</h1>
              </div>
              )
            )}
          </div>
        </div>
      </section>

      <section id="localization" className="flex min-h-screen flex-col justify-around items-start bg-[var(--primary-color)]">
        <div className="w-full flex flex-col lg:flex-row items-center justify-around text-black space-y-20 lg:space-y-0">
          <div className="w-11/12 lg:w-6/12 space-y-20">
            <div>
              <h1 className="font-bold text-2xl lg:text-3xl">Nossa localização!</h1>
              <p className="text-lg lg:text-xl font-semibold">Rua São Gabriel, 112, Bairro Jardim, Cidade Nova, Estado Metropolitano</p>
            </div>

            <div className="bg-[var(--secondary-color)] px-8 py-4 rounded">
              <h1 className="text-xl lg:text-2xl font-bold space-y-2">Horário de funcionamento:</h1>
              <p className="text-lg">Todos os dias de <b>08:00</b> ás <b>18:00</b></p>
            </div>
          </div>

          <div>
            <Image src="/map.png" alt="Image map" width={350} height={350} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
