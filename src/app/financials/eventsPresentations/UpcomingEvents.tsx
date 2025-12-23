import React from "react";
import { UpcomingEventsProps } from "@/types/home.types";

export function UpcomingEvents({ events }: UpcomingEventsProps) {

  console.log("Upcoming Events:", events);
  return (
    <section className="px-10 py-16">
      <h2 className="text-xl font-bold mb-10">Upcoming Events</h2>

      {events.map((ev) => (
        <div
          key={ev.id}
          className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 
                     flex flex-col md:flex-row items-center md:items-start gap-8 mb-6"
        >
          {/* Columna 1: Icono */}
          <div className="flex-shrink-0 flex flex-col items-center min-w-[220px]">
            <img src="/assets/icons/calendar-icon.png" className="h-12 w-12 mb-2" />
          </div>

          {/* Columna 2: Fecha */}
          <div className="flex-shrink-0 min-w-[420px]">
            <p className="text-[#E6007E] font-bold text-lg">{ev.date}</p>
          </div>

          {/* Columna 2: Título */}
          <div className="flex-shrink-0 min-w-[420px]">
            <p className=" font-bold text-lg">{ev.title}</p>
          </div>

          {/* Columna 3: Descripción */}
          <div className="flex-1 text-gray-700 text-sm leading-relaxed">
            {ev.summary}
          </div>
        </div>
      ))}
    </section>
  );
}
