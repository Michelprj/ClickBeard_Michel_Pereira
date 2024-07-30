'use client';

import { useAuth } from "@/context/auth/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { MdPerson } from "react-icons/md";
import { RxExit } from "react-icons/rx";

type HeaderProps = {
  isHome?: boolean;
}

const Button = ({ onClick, children, className }: { onClick: () => void, children: React.ReactNode, className?: string }) => (
  <button onClick={onClick} className={`py-1 px-6 w-full lg:w-auto mb-2 lg:mb-0 rounded ${className}`}>
    {children}
  </button>
);

export default function Header({ isHome }: HeaderProps) {
  const { push } = useRouter();
  const { authInfo, signOut } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const toProfile = () => {
    push("/profile");
    setMenuOpen(false);
  }

  const isAdmin = authInfo?.user?.isAdmin;
  const isLoggedIn = !!authInfo?.accessToken;

  const renderAuthButtons = () => (
    <div className="block lg:flex items-center gap-6 w-full">
      {isAdmin && pathname !== '/toSchedule' && (
        <Button
          onClick={() => push("/toSchedule")}
          className="border border-[var(--primary-color)] text-white hover:bg-white hover:text-black"
        >
          Agenda completa
        </Button>
      )}
      {isAdmin && pathname !== '/registerBarber' && (
        <Button
          onClick={() => push("/registerBarber")}
          className="bg-[var(--primary-color)] hover:bg-white hover:text-black"
        >
          Cadastrar barbeiros
        </Button>
      )}
      {!isAdmin && pathname === '/mySchedule' && (
        <Button
          onClick={() => push("/toSchedule")}
          className="bg-[var(--primary-color)] hover:bg-white hover:text-black"
        >
          Novo agendamento
        </Button>
      )}
      {isAdmin && pathname !== '/allSchedules' && (
        <Button
          onClick={() => push("/allSchedules")}
          className="bg-[var(--primary-color)] hover:bg-white hover:text-black"
        >
          Todos os agendamentos
        </Button>
      )}
      {!isAdmin && pathname !== '/mySchedule' && (
        <Button
          onClick={() => push("/mySchedule")}
          className="border border-[var(--primary-color)] text-white hover:bg-white hover:text-black"
        >
          Meus agendamentos
        </Button>
      )}
       {isAdmin && pathname !== '/allBarbers' && (
        <Button
          onClick={() => push("/allBarbers")}
          className="border border-[var(--primary-color)] text-white hover:bg-white hover:text-black"
        >
          Barbeiros
        </Button>
      )}
      <div className="space-x-4 flex items-center justify-center my-8 lg:my-0">
        <button onClick={() => toProfile()} className="flex items-end hover:text-[var(--primary-color)]">
          <MdPerson size={25} />
          <p className="text-sm ml-2">{authInfo?.user?.name}</p>
        </button>
        <span className="border h-6 mx-2 bg-white" />
        <button onClick={handleLogout} className="hover:text-[var(--primary-color)]">
          <RxExit size={25} />
        </button>
      </div>
    </div>
  );

  const renderAuthLinks = () => (
    <div className="space-x-8 lg:flex">
      <Button
        onClick={() => push("/login")}
        className="border border-white hover:bg-white hover:text-black"
      >
        Entrar
      </Button>
      <Button
        onClick={() => push("/register")}
        className="bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]"
      >
        Criar conta
      </Button>
    </div>
  );

  return (
    <div className="h-16 bg-black flex justify-between px-6 md:px-0 md:justify-around items-center text-white fixed top-0 w-full z-30">
      <div>
        <button onClick={() => push( isLoggedIn ? "" : "/")} className="font-bold text-2xl">CLICKBEARD</button>
      </div>
      <div className="flex gap-8 font-semibold items-center hidden lg:flex">
        {isHome && (
          <div className="flex gap-8">
            <Link href="#home" className="hover:text-[var(--primary-color)] hover:scale-105">Início</Link>
            <Link href="#values" className="hover:text-[var(--primary-color)] hover:scale-105">Valores</Link>
            <Link href="#localization" className="hover:text-[var(--primary-color)] hover:scale-105">Localização</Link>
          </div>
        )}
        {isLoggedIn ? renderAuthButtons() : renderAuthLinks()}
      </div>
      <div className="lg:hidden">
        <button className="text-white" onClick={() => toggleMenu()}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="lg:hidden absolute top-16 w-full text-center right-0 bg-black text-white flex flex-col gap-4 p-4">
          {isHome && (
            <div className="flex flex-col gap-4">
              <Link onClick={() => setMenuOpen(false)} href="#home" className="hover:text-[var(--primary-color)] hover:scale-105">Início</Link>
              <Link onClick={() => setMenuOpen(false)} href="#values" className="hover:text-[var(--primary-color)] hover:scale-105">Valores</Link>
              <Link onClick={() => setMenuOpen(false)} href="#localization" className="hover:text-[var(--primary-color)] hover:scale-105">Localização</Link>
            </div>
          )}
          {isLoggedIn ? renderAuthButtons() : renderAuthLinks()}
        </div>
      )}
    </div>
  );
}
