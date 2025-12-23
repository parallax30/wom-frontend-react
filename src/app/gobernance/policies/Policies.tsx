import React from "react";
import {
PolicyInformationProps,
} from "@/types/home.types";

export function Policies({ policies }: PolicyInformationProps) {
    return (
  <section className="px-10 py-16 mt-10">
    <h2 className="text-xl font-bold mb-10">Policies</h2>

    {policies.map((d) => (
      <div
        key={d.id}
        className="bg-white border rounded-xl p-6 mb-6
                   grid grid-cols-[200px_1fr_200px] items-center gap-6"
      >
        {/* COLUMNA 1 – izquierda */}
        <div className="text-center">
          <p className="text-[#E6007E] font-bold">{d.title}</p>
        </div>

        {/* COLUMNA 2 – centrada */}
        <div className="text-center">
          <p className="text-xs text-gray-600">{d.summary}</p>
        </div>

        {/* COLUMNA 3 – derecha */}
        <div className="flex justify-end">
          <a
            href={d.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#350A63] text-[#350A63] px-4 py-2 rounded-full text-sm flex items-center gap-2"
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