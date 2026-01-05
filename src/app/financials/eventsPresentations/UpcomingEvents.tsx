import React from "react";
import { UpcomingEventsProps } from "@/types/home.types";

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <section className="px-4 md:px-10 py-12 md:py-16">
      <h2 className="text-xl font-bold mb-8 md:mb-10">Upcoming Events</h2>

      {events.map((ev) => (
        <div
          key={ev.id}
          className="
            bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200
            flex flex-col md:flex-row
            items-center md:items-start
            gap-6 md:gap-8
            mb-6
          "
        >
          {/* Icono */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <img
              src="/assets/icons/calendar-icon.png"
              className="h-10 w-10 md:h-12 md:w-12"
            />
          </div>

          {/* Fecha */}
          <div className="w-full md:w-[200px] text-center md:text-left">
            <p className="text-[#E6007E] font-bold text-base md:text-lg">
              {ev.date}
            </p>
          </div>

          {/* Título */}
          <div className="w-full md:w-[260px] text-center md:text-left">
            <p className="font-bold text-base md:text-lg">
              {ev.title}
            </p>
          </div>

          {/* Descripción */}
          <div className="w-full text-gray-700 text-sm leading-relaxed">
            {ev.summary}
          </div>
        </div>
      ))}
    </section>
  );
}
