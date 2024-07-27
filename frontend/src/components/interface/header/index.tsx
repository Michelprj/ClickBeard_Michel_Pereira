import Link from "next/link";

export default function Header() {
  return (
    <div className="h-16 bg-black flex justify-between px-6 md:px-0 md:justify-around items-center text-white fixed top-0 w-full z-30">
      <div>
        <h1 className="font-bold text-2xl">CLICKBEARD</h1>
      </div>

      <div className="flex gap-8 font-semibold items-center hidden md:flex">
        <div className="flex gap-8">
          <Link href="/" className="hover:text-[var(--primary-color)] hover:scale-105">Início</Link>
          <Link href="/" className="hover:text-[var(--primary-color)] hover:scale-105">Valores</Link>
          <Link href="/" className="hover:text-[var(--primary-color)] hover:scale-105">Contato</Link>
        </div>
        
        <button className="py-1 px-6 border border-white rounded hover:bg-white hover:text-black">Entrar</button>
        <button className="py-1 px-6 bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] rounded">Criar conta</button>
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
