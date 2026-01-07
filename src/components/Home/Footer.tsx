
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

export function Footer({ contact }: FooterProps) {
  return (
    <footer className="w-full bg-[#2D1540] text-white px-4 py-10 md:px-10 md:py-12">
      <div
        className="
          flex flex-col items-center text-center gap-8
          md:grid md:grid-cols-3 md:items-start md:text-left
        "
      >
        {/* Columna 1 – Contact Us */}
        <div className="flex items-center gap-3 md:justify-start">
          <img src="/assets/communication.png" className="h-6 w-6" />
          <a
            href="/contactUs"
            className="font-bold text-[#E92070] hover:underline"
          >
            Contact Us
          </a>
        </div>

        {/* Columna 2 – Contact Email */}
        <div>
          <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
            <img src="/assets/communication.png" className="h-5 w-5" />
            <p className="font-bold">Contact Email</p>
          </div>
          <p className="text-sm">{contact.email}</p>
        </div>

        {/* Columna 3 – Logo */}
        <div className="flex justify-center md:justify-end">
          <img src="/assets/wom_logo.png" className="h-16 md:h-20" />
        </div>
      </div>
    </footer>
  );
}
