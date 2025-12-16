import React from "react";
import {
HeroProps
} from "@/types/home.types";

export function Hero({ image }: HeroProps) {
    return (
        <header
        className="w-full h-[300px] bg-gray-300 flex items-center justify-center text-3xl font-semibold"
        style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
        >
                <div
                    className="absolute top-0 left-0 w-full h-[78px]"
                    style={{
                    background: "linear-gradient(to right, #3E0279, #EC2375)",
                }}
            />
            <h1 className="text-white text-4xl md:text-5xl font-extrabold">INVERTERS PORTAL</h1>
        </header>
    );
}