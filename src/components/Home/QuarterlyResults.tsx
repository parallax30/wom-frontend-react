"use client";

import { ReportItem } from "@/types/home.types";
import React from "react";


interface QuarterlyResultsProps {
  quarter: string;
  reports: ReportItem[];
  titleButton1: string;
}

export function QuarterlyResults({ quarter, reports, titleButton1 }: QuarterlyResultsProps) {
  return (
    <section className="px-10 py-16">
      <h2 className="text-xl font-bold mb-6">Latest Quarterly Results</h2>
      <h3 className="text-[#350A63] font-semibold mb-8">{quarter}</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reports.map((r) => (
          <div key={r.id} className="bg-[#CCC4D2] p-8 rounded-xl text-center shadow">
            <h4 className="font-bold mb-4">{r.homeFinancialCardTitle}</h4>
            <img src={r.icon} className="h-16 mx-auto mb-4" alt={r.homeFinancialCardTitle} />
            <a
              href={r.homeFinancialCardLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#350A63] flex items-center justify-center gap-2 text-sm"
            >
              <img src={r.linkIcon} className="h-4" alt="Download Icon" />
              {r.homeFinancialCardLinkText}
            </a>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center mt-8">
        <a
          href="/financials/reports"
          className="bg-[#E6007E] text-white px-6 py-2 rounded-full text-sm text-center inline-block"
        >
          {titleButton1}
        </a>
      </div>
    </section>
  );
}
