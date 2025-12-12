

import React from "react";
import {
LatestNewsProps,
} from "@/types/home.types";

export function LatestNews({ news }: LatestNewsProps) {
    return (
        <section className="px-10 py-16">
            <h2 className="text-xl font-bold mb-10">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {news.map((n) => (
                <div key={n.id} className="border rounded-xl p-6 shadow-sm">
                    <img src={n.icon} className="h-10 mb-4" />
                    <h4 className="font-bold mb-2">{n.title}</h4>
                    <p className="text-sm text-gray-700">{n.summary}</p>
                </div>
                ))}
            </div>
            <div className="w-full flex justify-center mt-10">
            <button className="bg-[#E6007E] text-white px-6 py-2 rounded-full text-sm">VIEW ALL NEWS</button>
            </div>
        </section>
    );
}