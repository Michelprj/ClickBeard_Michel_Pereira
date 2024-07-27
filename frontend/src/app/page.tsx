'use client';

import Header from "@/components/interface/header";
import LoginInput from "@/components/login/input";
import { LoginFormData, loginSchema } from "@/schemas/login";
import Image from "next/image";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth/auth";
import { api } from "@/infrastructure/api/axios";
import Loader from "@/components/loader";

export default function Home() {
  useEffect(() => {
    const createAdmin = async () => {
      await api.post('/');
    }

    createAdmin();
  }, []);

  return (
    <main className="flex min-h-screen flex-col justify-center items-center bg-black">
      <Header />
      <Image src="/background-login.png" alt="Image Login" layout="fill" objectFit="cover" className="z-10" />

    </main>
  );
}
