
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

export function Footer({ contact }: FooterProps) {
    return (
        <footer
            className="w-full text-white px-10 py-12"
            style={{ background: "#2D1540" }}
        >
            <div className="grid grid-cols-6 gap-6 items-start">

            {/* Columna 1 - vacía */}
            <div></div>

            {/* Columna 2 - Icono + Contact Us */}
            <div className="flex items-center gap-3">
                <img src="/assets/icons/contact-us-icon.png" className="h-6 w-6" />
                <a
                href="/contactUs"
                className="font-bold text-[#E92070] hover:underline"
                >
                Contact Us
                </a>
            </div>

            {/* Columna 3 - vacía */}
            <div></div>

            {/* Columna 4 - Contact Email + Contact Phone */}
            <div>
                <div className="flex items-center gap-2 mb-1">
                <img src="/assets/icons/email-footer-icon.png" className="h-5 w-5" />
                <p className="font-bold">Contact Email</p>
                </div>
                <p className="text-sm mb-4 ml-7">{contact.email}</p>

                {/* <div className="flex items-center gap-2 mb-1">
                <img src="/assets/icons/phone-footer-icon.png" className="h-5 w-5" />
                <p className="font-bold">Contact Phone</p>
                </div>
                <p className="text-sm ml-7">{contact.phone}</p>*/}
            </div>

            {/* Columna 5 - vacía */}
            <div></div>

            {/* Columna 6 - Logo alineado a la derecha */}
            <div className="flex justify-end">
                <img src="/assets/wom_logo_blanco.png" className="h-20" />
            </div>

            </div>
        </footer>
        );

}