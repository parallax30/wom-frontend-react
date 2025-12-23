"use client";

import React from "react";
import { OtherSegmentsProps } from "@/types/home.types";

export function OtherSegments({ segments }: OtherSegmentsProps) {

  function handleView(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="px-10 py-16 bg-[#F4F4F7]">
      <h2 className="text-xl font-bold mb-10">Other Important Segments</h2>

      {segments.map((ev) => (
        <div
          key={ev.id}
          className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 
                     flex flex-col md:flex-row items-center md:items-start gap-8 mb-6"
        >
          {/* Columna 1 */}
          <div className="flex-shrink-0 min-w-[420px]">
            <p className="text-[#E6007E] font-bold text-lg">{ev.title}</p>
            {ev.description && (
              <p className="text-sm text-gray-600 mt-1">{ev.description}</p>
            )}
          </div>

          {/* Botón */}
          <div className="md:self-center md:ml-auto">
            <button
              onClick={() => handleView(ev.fileUrl)}
              className="bg-[#E6007E] text-white px-5 py-2 rounded-full text-sm
                         shadow hover:bg-pink-700 transition"
            >
              VIEW
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
