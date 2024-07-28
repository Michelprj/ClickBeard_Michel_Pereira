'use client';

import ComponentsAppsCalendar from "@/components/calendar";
import Header from "@/components/interface/header";

export default function ToSchedule() {
  return (
    <div className="min-h-screen bg-[#181717]">
      <Header />
      <ComponentsAppsCalendar />
    </div>
  )
}
