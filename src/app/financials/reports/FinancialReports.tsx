"use client";

import React, { useMemo, useState } from "react";
import {
  FiBarChart2,
  FiFileText,
  FiFile,
  FiPlayCircle,
} from "react-icons/fi";

type ApiItem = {
  financialCollectionQDocumentYear: string;
  financialCollectionQDocumentQ: "Q1" | "Q2" | "Q3" | "Q4";
  financialCollectionQDocumentName: string;
  financialCollectionQDocumentLinkUrl: string;
};

type Props = {
  data: ApiItem[];
};

const COLOR = "#5A2C7A";

/** Q4 → Q1 */
const QUARTERS = ["Q4", "Q3", "Q2", "Q1"] as const;

/** Orden de filas */
const ROWS = [
  {
    label: "Earnings Release",
    type: "Earnings Release",
    icon: FiFileText,
  },
  {
    label: "Earnings Transcript",
    type: "Earnings Transcript",
    icon: FiPlayCircle,
  },
  {
    label: "Earnings Presentation",
    type: "Earnings Presentation",
    icon: FiBarChart2,
  },
  {
    label: "Financial Statements",
    type: "Financial Statements",
    icon: FiFile,
  },
];

export function FinancialReports({ data }: Props) {
  const years = useMemo(
    () =>
      Array.from(
        new Set(data.map((d) => d.financialCollectionQDocumentYear))
      ).sort((a, b) => Number(b) - Number(a)),
    [data]
  );

  const [year, setYear] = useState(years[0]);

  const matrix = useMemo(() => {
    return ROWS.map((row) => {
      const quarters = QUARTERS.map((q) => {
        const item = data.find(
          (d) =>
            d.financialCollectionQDocumentYear === year &&
            d.financialCollectionQDocumentQ === q &&
            d.financialCollectionQDocumentName.trim() === row.type
        );

        return item ?? null;
      });

      return { ...row, quarters };
    });
  }, [data, year]);

  return (
    <section className="px-10 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold" style={{ color: COLOR }}>
          Financial Reports
        </h2>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="rounded-md px-6 py-2 font-semibold w-40 bg-white"
          style={{ border: `1px solid ${COLOR}`, color: COLOR }}
        >
          {years.map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* Header */}
      <div
        className="grid grid-cols-[260px_repeat(4,1fr)] text-white rounded-t-lg"
        style={{ backgroundColor: COLOR }}
      >
        <div className="p-4 font-semibold">{year}</div>
        {QUARTERS.map((q) => (
          <div key={q} className="p-4 text-center font-semibold">
            {q}
          </div>
        ))}
      </div>

      {/* Rows */}
      <div
        className="border border-t-0 rounded-b-lg"
        style={{ borderColor: COLOR }}
      >
        {matrix.map((row, rowIdx) => (
          <div
            key={row.label}
            className={`grid grid-cols-[260px_repeat(4,1fr)] items-center border-t ${
              rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
            style={{ borderColor: COLOR }}
          >
            <div
              className="p-4 font-medium"
              style={{ color: COLOR }}
            >
              {row.label}
            </div>

            {row.quarters.map((item, idx) => {
              const Icon = row.icon;
              const enabled = Boolean(item);

              return (
                <div key={idx} className="p-4 flex justify-center">
                  {enabled ? (
                    <a
                      href={`${process.env.NEXT_PUBLIC_API_URL}${item!.financialCollectionQDocumentLinkUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon
                        size={26}
                        style={{ color: COLOR }}
                        className="hover:scale-110 transition"
                      />
                    </a>
                  ) : (
                    <Icon size={26} className="text-gray-300" />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
