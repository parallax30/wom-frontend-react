"use client";

import React from "react";
import { FiFileText } from "react-icons/fi";
import { LatestNewsItem } from "@/types/news.types"

interface LatestNewsListProps {
  news: LatestNewsItem[];
}

export function LatestNewsList({ news }: LatestNewsListProps) {
  return (
    <section className="mt-12 w-full flex flex-col items-center">
        <div className="w-[80%] mx-auto">
            <h2 className="text-3xl font-bold mb-4">Latest News</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {news.map((n) => (
                <div
                    key={n.id}
                    className="border border-gray-300 rounded-2xl p-10 shadow-sm hover:shadow-lg transition"
                >
                    <div className="flex justify-center mb-4">
                    <FiFileText size={70} color="#350A63" />
                    </div>

                    <h3 className="text-2xl font-bold text-center mb-4">
                    {n.title}
                    </h3>

                    <p className="text-gray-700 text-base text-center leading-relaxed mb-10">
                    {n.summary}
                    </p>

                    <div className="flex justify-center">
                    <a
                        href={n.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-[#E6007E] text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow hover:bg-pink-700 transition"
                    >
                        <FiFileText size={28} color="white" />
                        VIEW
                    </a>
                    </div>
                </div>
                ))}
            </div>
        
        </div>

      
    </section>
  );
}
