

import React from "react";
import { PastEventsProps } from "@/types/financial.pastevents";

export function PastEvents({ events }: PastEventsProps) {
  return (
    <section className="px-4 md:px-10 py-12 md:py-16 bg-[#F4F4F7]">
      <h2 className="text-xl font-bold mb-8 md:mb-10">Past Events</h2>

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
          <div className="flex-shrink-0">
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

          {/* CTA */}
          <div className="w-full md:w-auto flex justify-center md:justify-end">
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
              <img
                src={ev.icon || "/assets/icons/go-to-icon.png"}
                className="h-4"
              />
              GO TO
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}
