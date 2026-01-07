import React from "react";
import { UpcomingEventsProps } from "@/types/home.types";

export function UpcomingEvents({ events, titleButton1 }: UpcomingEventsProps) {
  return (
    <section className="px-4 py-10 md:px-10 md:py-16 bg-[#F4F4F7]">
      <h2 className="text-xl font-bold mb-8">Upcoming Events</h2>

      {events.map((ev) => (
        <div
          key={ev.id}
          className="
            bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-gray-200
            flex flex-col gap-4
            md:flex-row md:items-start md:gap-8
            mb-6
          "
        >
          {/* Columna 1: Icono */}
          <div className="flex-shrink-0 flex items-center md:flex-col md:items-center">
            <img
              src="/assets/icons/calendar-icon.png"
              className="h-10 w-10 md:h-12 md:w-12"
            />
          </div>

          {/* Columna 2: Título + Fecha */}
          <div className="md:w-[320px]">
            <p className="text-[#E6007E] font-bold text-base md:text-lg">
              {ev.title}
            </p>
            <p className="text-sm text-[#E6007E] font-medium mt-1">
              {ev.date}
            </p>
          </div>

          {/* Columna 3: Descripción */}
          <div className="flex-1 text-gray-700 text-sm leading-relaxed">
            {ev.description}
          </div>
        </div>
      ))}

      {/* Button */}
      <div className="w-full flex justify-center mt-8 md:mt-10">
        <a
          href="/financials/eventsPresentations"
          className="
            bg-[#E6007E] text-white
            px-6 py-2 rounded-full text-sm
            w-full md:w-auto text-center
          "
        >
          {titleButton1}
        </a>
      </div>
    </section>
  );
}
