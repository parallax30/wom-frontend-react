import React from "react";
import {
MenuItem,
UserInfo,
HeroProps,
DateBarProps,
QuarterlyResultsProps,
LatestNewsProps,
UpcomingEventsProps,
BondInformationProps,
FooterProps,
HomePageProps,
} from "@/types/home.types";

export function BondInformation({ documents }: BondInformationProps) {
    return (
  <section className="px-10 py-16">
    <h2 className="text-xl font-bold mb-10">Bond Information</h2>

    {documents.map((d) => (
      <div
        key={d.id}
        className="bg-white border rounded-xl p-6 mb-6
                   grid grid-cols-[200px_1fr_200px] items-center gap-6"
      >
        {/* COLUMNA 1 – izquierda */}
        <div className="text-center">
          <p className="text-[#E6007E] font-bold">{d.date}</p>
        </div>

        {/* COLUMNA 2 – centrada */}
        <div className="text-center">
          <p className="font-semibold">{d.title}</p>
          <p className="text-xs text-gray-600">{d.summary}</p>
        </div>

        {/* COLUMNA 3 – derecha */}
        <div className="flex justify-end">
          {d.fileUrl ? (
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}${d.fileUrl}`}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#350A63] text-[#350A63] px-4 py-2 rounded-full text-sm flex items-center gap-2"
            >
              <img src="/assets/icons/download-icon.png" className="h-4" />
              DOWNLOAD
            </a>
          ) : (
            <button
              disabled
              className="border border-[#BDBDBD] text-[#BDBDBD] px-4 py-2 rounded-full text-sm flex items-center gap-2 opacity-50 cursor-not-allowed"
            >
              <img src="/assets/icons/download-icon.png" className="h-4" />
              NO FILE
            </button>
          )}
        </div>
      </div>
    ))}
  </section>
);

}