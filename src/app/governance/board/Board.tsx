"use client";

import React from "react";
import { BoardMember, BoardProps } from "@/types/board.types";

export function Board({ members }: BoardProps) {
  return (
    <section className="px-52 py-16 mt-10">
      <h2 className="text-xl font-bold mb-10">Board Members</h2>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {members.map((m: BoardMember) => (
          <div
            key={m.id}
            className="bg-[#2D1540] text-white shadow-md rounded-xl p-6 text-center"
          >
            <h3 className="text-lg font-bold text-white">{m.name}</h3>
            <h4 className="text-md font-semibold text-[#E5DDF0] mb-4">
              {m.position}
            </h4>

            <p className="text-sm text-white/90 leading-relaxed">
              {m.description}
            </p>
                      </div>
                    ))}
      </div>
    </section>
  );
}
