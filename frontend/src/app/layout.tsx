import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../components/calendar/styles.css";
import { AuthProvider } from "@/context/auth/auth";
import RegisterProvider from "@/context/register/register";
import SchedulesProvider from "@/context/schedules/schedules";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClickBeard | Michel Pereira",
  description: "ClickBeard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <RegisterProvider>
        <SchedulesProvider>
          <html lang="pt-BR">
            <body className={inter.className}>{children}</body>
          </html>
        </SchedulesProvider>
      </RegisterProvider>
    </AuthProvider>
  );
}
