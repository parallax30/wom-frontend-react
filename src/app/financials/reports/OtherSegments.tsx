"use client";

import React from "react";
import { OtherSegmentsProps } from "@/types/home.types";

export function OtherSegments({ segments }: OtherSegmentsProps) {
  function handleView(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="px-4 py-10 bg-[#F4F4F7] md:px-10 md:py-16">
      <h2 className="text-xl font-bold mb-8 md:mb-10">
        Other Important Segments
      </h2>

      {segments.map((ev) => (
        <div
          key={ev.id}
          className="
            bg-white border border-gray-200 shadow-sm rounded-2xl
            p-4 md:p-8 mb-6
            flex flex-col gap-4
            md:flex-row md:items-start md:gap-8
          "
        >
          {/* Columna 1 – texto */}
          <div className="flex-1">
            <p className="text-[#E6007E] font-bold text-base md:text-lg">
              {ev.title}
            </p>

            {ev.description && (
              <p className="text-sm text-gray-600 mt-1">
                {ev.description}
              </p>
            )}
          </div>

          {/* Botón */}
          <div className="flex md:self-center md:ml-auto">
            <button
              onClick={() =>
                handleView(
                  `${ev.fileUrl}`
                )
              }
              className="
                bg-[#E6007E] text-white
                px-5 py-2 rounded-full text-sm
                shadow hover:bg-pink-700 transition
                w-full md:w-auto
              "
            >
              VIEW
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
