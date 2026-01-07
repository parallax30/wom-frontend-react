"use client";

import React, { useEffect, useState } from "react";

export interface BoardMember {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
}

export interface BoardProps {
  members: BoardMember[];
}

export default function Management({ members }: BoardProps) {
  const [isTouch, setIsTouch] = useState(false);
  const [flippedId, setFlippedId] = useState<number | null>(null);

  // Detect touch device
  useEffect(() => {
    const hasTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    setIsTouch(hasTouch);
  }, []);

  const handleCardClick = (id: number) => {
    if (!isTouch) return; // desktop usa hover
    setFlippedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="px-10 py-16 mt-10">
      <h2 className="text-xl font-bold mb-10 text-[#2D1540]">Management Team</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {members.map((m) => {
          const isFlipped = isTouch && flippedId === m.id;

          return (
            <div
              key={m.id}
              onClick={() => handleCardClick(m.id)}
              className={`group w-full h-72 [perspective:1000px] ${
                isTouch ? "cursor-pointer" : ""
              }`}
            >
              <div
                className={`
                  relative w-full h-full duration-700 [transform-style:preserve-3d]
                  ${
                    isTouch
                      ? isFlipped
                        ? "[transform:rotateY(180deg)]"
                        : ""
                      : "group-hover:[transform:rotateY(180deg)]"
                  }
                `}
              >
                {/* FRONT */}
                <div
                  className="absolute inset-0 bg-white rounded-xl shadow-md flex flex-col items-center 
                             justify-center p-6 text-center [backface-visibility:hidden]"
                >
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-48 h-48 rounded-full object-cover mb-4"
                  />

                  <h3 className="text-lg font-bold text-[#2D1540]">
                    {m.name}
                  </h3>
                  <p className="text-sm text-purple-800 mt-1">{m.role}</p>
                </div>

                {/* BACK */}
                <div
                  className="absolute inset-0 bg-[#2D1540] text-white rounded-xl shadow-md 
                             p-6 flex items-center justify-center text-center 
                             [backface-visibility:hidden] [transform:rotateY(180deg)]"
                >
                  <p className="text-sm leading-relaxed px-2">
                    {m.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
