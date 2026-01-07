import React from "react";
import {
PolicyInformationProps,
} from "@/types/home.types";

export function Policies({ policies }: PolicyInformationProps) {
  return (
    <section className="px-4 py-10 mt-10 md:px-10 md:py-16">
      <h2 className="text-xl font-bold mb-8 md:mb-10">Policies</h2>

      {policies.map((d) => (
        <div
          key={d.id}
          className="
            bg-white border rounded-xl
            p-4 md:p-6 mb-6
            flex flex-col gap-4
            md:grid md:grid-cols-[200px_1fr_200px]
            md:items-center md:gap-6
          "
        >
          {/* Columna 1 – título */}
          <div className="md:text-center">
            <p className="text-[#E6007E] font-bold">{d.title}</p>
          </div>

          {/* Columna 2 – summary */}
          <div className="md:text-center">
            <p className="text-xs text-gray-600">{d.summary}</p>
          </div>

          {/* Columna 3 – botón */}
          <div className="flex md:justify-end">
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}${d.fileUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                border border-[#350A63] text-[#350A63]
                px-4 py-2 rounded-full text-sm
                flex items-center gap-2
                w-full md:w-auto justify-center
              "
            >
              <img src="/assets/icons/download-icon.png" className="h-4" />
              DOWNLOAD
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}
