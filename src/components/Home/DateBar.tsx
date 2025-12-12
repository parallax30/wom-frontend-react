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

export function DateBar({ date }: DateBarProps) {
    return (
        <div className="w-full text-right text-sm px-10 py-3" style={{ background: "#350A6333" }}>
            {date}
        </div>
    );
}