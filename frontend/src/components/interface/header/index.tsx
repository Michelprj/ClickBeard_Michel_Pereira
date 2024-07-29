'use client';

import { useAuth } from "@/context/auth/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MdPerson } from "react-icons/md";
import { RxExit } from "react-icons/rx";

type HeaderProps = {
  isHome?: boolean;
}

export default function Header({ isHome }: HeaderProps) {
  const {push} = useRouter();
  const { authInfo, signOut } = useAuth();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut();
  }

  return (
    <div className="h-16 bg-black flex justify-between px-6 md:px-0 md:justify-around items-center text-white fixed top-0 w-full z-30">
      <div>
        <button onClick={() => push("/")} className="font-bold text-2xl">CLICKBEARD</button>
      </div>

      <div className="flex gap-8 font-semibold items-center hidden md:flex">
        { isHome && (
          <div className="flex gap-8">
            <Link href="#home" className="hover:text-[var(--primary-color)] hover:scale-105">Início</Link>
            <Link href="#values" className="hover:text-[var(--primary-color)] hover:scale-105">Valores</Link>
            <Link href="#localization" className="hover:text-[var(--primary-color)] hover:scale-105">Localização</Link>
          </div>
          )
        }
        { authInfo.accessToken ? (
          <div className="flex items-center gap-6">
            { (pathname === '/' || pathname === '/registerBarber') && authInfo.user.isAdmin && 
              <button onClick={() => push("/toSchedule")} className="py-1 px-6 border border-[var(--primary-color)] text-white hover:bg-white hover:text-black rounded">Agendandos hoje</button>
            }
            { authInfo.user.isAdmin && 
              <button onClick={() => push("/registerBarber")} className="py-1 px-6 rounded bg-[var(--primary-color)] hover:bg-white hover:text-black">Cadastrar barbeiros</button>
            }
            { (pathname === '/mySchedule' || pathname === '/') && !authInfo.user.isAdmin && 
              <button onClick={() => push("/toSchedule")} className="py-1 px-6 rounded bg-[var(--primary-color)] hover:bg-white hover:text-black">Novo agendamento</button>
            }
            { (!authInfo.user.isAdmin && pathname !== '/mySchedule') && 
              <button onClick={() => push("/mySchedule")} className="py-1 px-6 border border-[var(--primary-color)] text-white hover:bg-white hover:text-black rounded">Meus agendamentos</button>
            }
            <div className="space-x-4 flex items-center">
              <button onClick={() => push("/")}>
                <MdPerson size={25} />
              </button>
              <button onClick={() => handleLogout()}>
                <RxExit size={25} />
              </button>
            </div>

          </div>
        ) : (
          <div className="space-x-8">
            <button onClick={() => push("/login")} className="py-1 px-6 border border-white rounded hover:bg-white hover:text-black">Entrar</button>
            <button onClick={() => push("/register")} className="py-1 px-6 bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] rounded">Criar conta</button>
          </div>
        )
        }
      </div>

      <div className="md:hidden">
        <button className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

    </div>
  );
}
