"use client";

import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { FinancialReportsProps, ReportItem } from "@/types/financial.types";

export function FinancialReports({ data }: FinancialReportsProps) {


  const years = Object.keys(data).sort((a, b) => Number(b) - Number(a));

  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedQuarter, setSelectedQuarter] = useState<string | null>(null);

  const quarters = ["Q1", "Q2", "Q3", "Q4"];

  const hasQuarterData = (q: string) =>
    data[selectedYear]?.[q] && data[selectedYear][q].length > 0;

  const reports: ReportItem[] =
    selectedQuarter ? data[selectedYear][selectedQuarter] : [];

  return (
    <section className="px-10 py-16">
      <h2 className="text-2xl font-bold mb-6">Financial Reports</h2>

      {/* Title */}
      <h3 className="text-xl font-semibold text-center mb-10">
        Previous Years Documents
      </h3>

      {/* Year Selector */}
      <div className="flex justify-center mb-6">
        <div className="flex bg-gray-100 rounded-full px-2 py-2 gap-2 shadow-inner">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => {
                setSelectedYear(year);
                setSelectedQuarter(null);
              }}
              className={`px-8 py-2 rounded-full transition font-semibold ${
                selectedYear === year
                  ? "bg-purple-700 text-white"
                  : "text-gray-700"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Quarter Selector — always visible */}
      <div className="flex justify-center gap-4 mb-10">
        {quarters.map((q) => {
          const enabled = hasQuarterData(q);

          return (
            <button
              key={q}
              disabled={!enabled}
              onClick={() => enabled && setSelectedQuarter(q)}
              className={`
                px-8 py-3 rounded-xl border text-sm font-semibold transition
                ${
                  selectedQuarter === q
                    ? "bg-purple-700 text-white"
                    : "border-purple-700 text-purple-700"
                }
                ${!enabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              {q}
            </button>
          );
        })}
      </div>

      {/* Reports Table */}
      {selectedQuarter && hasQuarterData(selectedQuarter) && (
        <div className="flex justify-center">
          <table className="w-4/5 border border-purple-800 rounded-xl overflow-hidden">
            <tbody>
              {reports.map((r, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } border-b border-purple-200`}
                >
                  <td className="p-4 text-lg text-gray-900 border-r border-purple-300">
                    {r.title}
                  </td>

                  <td className="p-4 text-center">
                    <a
                      href={r.url}
                      target="_blank"
                      className="flex items-center justify-center gap-2 text-[#0000EE] font-semibold"
                    >
                      <FiDownload size={22} color="#0000EE" />
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
