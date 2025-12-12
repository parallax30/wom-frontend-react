"use client";

import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { FiDownload, FiEye } from "react-icons/fi";

export interface OldNewsItem {
  id: string;
  monthYear: string;
  documentName: string;
  url: string;
}

interface Props {
  items: OldNewsItem[];
}

export function OldNewsTable({ items }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [sortField, setSortField] = useState<"monthYear" | "documentName" | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [loadingZip, setLoadingZip] = useState(false);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === items.length) {
      setSelected([]);
    } else {
      setSelected(items.map((i) => i.id));
    }
  };

  const sortData = (field: "monthYear" | "documentName") => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedItems = [...items].sort((a, b) => {
    if (!sortField) return 0;
    const valA = a[sortField].toLowerCase();
    const valB = b[sortField].toLowerCase();
    return sortDirection === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  const downloadAsZip = async () => {
    if (selected.length === 0) return;

    setLoadingZip(true);

    const zip = new JSZip();

    for (const id of selected) {
      const item = items.find((x) => x.id === id);
      if (!item) continue;

      const response = await fetch(item.url);
      const blob = await response.blob();

      const extension = item.url.split(".").pop() || "file";

      zip.file(`${item.documentName}.${extension}`, blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "news_documents.zip");

    setLoadingZip(false);
  };

  return (
    <section className="mt-12 w-full flex flex-col items-center">
      <div className="w-[80%] mb-10">
        <h2 className="text-3xl font-bold mb-6">Old News</h2>

        {/* Select all */}
        <div className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            checked={selected.length === items.length && items.length > 0}
            onChange={toggleSelectAll}
            className="w-5 h-5 cursor-pointer"
          />
          <span className="text-lg">Select All</span>
        </div>

        {/* Download Selected */}
        <div className="flex justify-end mb-4">
          <button
            disabled={selected.length === 0 || loadingZip}
            onClick={downloadAsZip}
            className={`px-8 py-3 border-2 rounded-xl flex items-center gap-3 
              font-semibold text-lg transition
              ${
                selected.length === 0 || loadingZip
                  ? "cursor-not-allowed border-purple-300 text-purple-300"
                  : "border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white"
              }
            `}
          >
            <FiDownload size={22} />
            {loadingZip ? "GENERATING ZIP..." : "DOWNLOAD SELECTED"}
          </button>
        </div>

        {/* Table */}
        <div className="overflow-y-auto max-h-[500px] border border-purple-800 rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-purple-800 text-white uppercase text-sm">
              <tr>
                <th className="p-4 border border-purple-900">Select</th>

                <th
                  className="p-4 border border-purple-900 cursor-pointer"
                  onClick={() => sortData("monthYear")}
                >
                  Month/Year
                  <span className="ml-2">
                    {sortField === "monthYear" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}
                  </span>
                </th>

                <th
                  className="p-4 border border-purple-900 cursor-pointer"
                  onClick={() => sortData("documentName")}
                >
                  Document Name
                  <span className="ml-2">
                    {sortField === "documentName" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}
                  </span>
                </th>

                <th className="p-4 border border-purple-900">Actions</th>
              </tr>
            </thead>

            <tbody>
              {sortedItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                >
                  <td className="p-4 border border-purple-900 text-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                      className="w-5 h-5 cursor-pointer"
                    />
                  </td>

                  <td className="p-4 border border-purple-900">{item.monthYear}</td>

                  <td className="p-4 border border-purple-900">{item.documentName}</td>

                  <td className="p-4 border border-purple-900 text-center">
                    <div className="flex justify-center gap-6">
                      <button onClick={() => window.open(item.url, "_blank")}>
                        <FiDownload size={24} className="text-purple-900 hover:text-purple-600" />
                      </button>

                      <button onClick={() => window.open(item.url, "_blank")}>
                        <FiEye size={24} className="text-purple-900 hover:text-purple-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
