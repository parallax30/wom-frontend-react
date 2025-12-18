

import React from "react";
import { PastEventsProps } from "@/types/financial.pastevents";

export function PastEvents({ events }: PastEventsProps) {
  return (
    <section className="px-10 py-16" style={{ background: "#F4F4F7" }}>
      <h2 className="text-xl font-bold mb-10">Past Events</h2>

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
            <p className="font-bold text-lg">{ev.title}</p>
          </div>

          {/* Columna 3: Descripción */}
          <div className="flex justify-end">
          <a
            href={ev.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              bg-[#E6007E] text-white
              px-5 py-2 rounded-full text-sm font-semibold
              flex items-center gap-2
              transition-colors duration-200
              hover:bg-[#cc006f]
            "
          >
            <img src="/assets/icons/arrow-goto-icon.png" className="h-4" />
            GO TO
          </a>
        </div>
        </div>
      ))}
    </section>
  );
}