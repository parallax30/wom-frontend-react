"use client";


import React from "react";
import { OtherSegmentsProps } from "@/types/home.types";




export function OtherSegments({ segments }: OtherSegmentsProps) {


  function handleDownload(url: string) {
    const link = document.createElement("a");
    link.href = url;
    link.download = ""; // fuerza descarga
    link.click();
  }
    return (
    <section className="px-10 py-16" style={{ background: "#F4F4F7" }}>
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
            <p className="text-sm text-[#E6007E] font-medium mt-1">
              {ev.title}
            </p>
          </div>

          {/* Columna 2 */}
          <div className="flex-1 text-gray-700 text-sm leading-relaxed">
            {ev.description}
          </div>

          {/* Botón */}
          <div className="md:self-center md:ml-auto">
            <button 
              onClick={() => handleDownload(ev.fileUrl)}
              className="bg-[#E6007E] text-white px-4 py-2 rounded-full text-xs md:text-sm shadow hover:bg-pink-700 transition"
            >
              VIEW
            </button>
          </div>
        </div>
      ))}

    </section>
  );

}
