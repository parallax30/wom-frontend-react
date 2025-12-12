"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { MenuItem, UserInfo } from "@/types/home.types";
import UserMenu from "../navbar/UserMenu";

interface NavbarProps {
  menuItems: MenuItem[];
  user: UserInfo;
}

export function Navbar({ menuItems, user }: NavbarProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUserMenuOpen(false);
    router.replace("/");
  }

  /* Cerrar menú mobile al hacer click fuera */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="relative w-full bg-white border-b border-gray-200 z-50 h-[72px]">
      {/* LOGO */}
      <div className="absolute -top-5 left-8 z-50 pointer-events-none">
        <img
          src="/assets/logo_azul.png"
          alt="Logo"
          className="h-36 w-auto pointer-events-none select-none"
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-8 h-full relative">
        <div className="flex items-center justify-center h-full">

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-0 text-base font-semibold h-full">
            {menuItems.map((item, idx) => {
              const submenu = item.submenu ?? [];
              const hasSubmenu = submenu.length > 0;
              const active = !!item.active;

              return (
                <div
                  key={item.label}
                  className="relative group h-full flex items-stretch"
                  onMouseLeave={() => setOpenIndex(null)}
                >
                  {hasSubmenu ? (
                    <button
                      type="button"
                      onClick={() => setOpenIndex(idx)}
                      className={`px-6 h-full flex items-center gap-2 transition-colors whitespace-nowrap
                        ${active ? "bg-[#350A63] text-white" : "text-[#2D1540] hover:text-[#350A63]"}
                      `}
                    >
                      {item.label}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M6 9l6 6 6-6"
                          stroke={active ? "#FFFFFF" : "#5A2C7A"}
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  ) : (
                    <a
                      href={item.href ?? "#"}
                      className={`px-6 h-full flex items-center transition whitespace-nowrap
                        ${active ? "bg-[#350A63] text-white" : "text-[#2D1540] hover:text-[#350A63]"}
                      `}
                    >
                      {item.label}
                    </a>
                  )}

                  {hasSubmenu && (
                    <div className="absolute left-0 top-full mt-0 hidden group-hover:block min-w-[200px] bg-white border rounded-md shadow-lg py-2 z-50">
                      {submenu.map((s) => (
                        <a
                          key={s.href}
                          href={s.href}
                          className="block px-4 py-2 text-sm text-[#2D1540] hover:bg-gray-100"
                        >
                          {s.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden absolute right-6 top-6">
            <MobileMenuButton
              onToggle={() => setMobileMenuOpen((prev) => !prev)}
            />
          </div>
        </div>

        {/* DESKTOP USER MENU (sin tocar) */}
        <div className="hidden md:flex absolute right-8 top-6 items-center gap-4">
          <a href="/contactUs" className="text-sm text-[#2D1540]">Contact Us</a>

          <button
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="relative"
          >
            <img
              src="/assets/user.png"
              alt={user.name ?? "user"}
              className="h-10 w-10 rounded-full border border-gray-300 object-cover cursor-pointer"
            />
          </button>

          {userMenuOpen && (
            <UserMenu
              user={user}
              onLogout={handleLogout}
              onClose={() => setUserMenuOpen(false)}
            />
          )}
        </div>

        {/* 🌟 MOBILE MENU (mejorado pero respetando estructura) */}
        <div
          ref={mobileMenuRef}
          className={`
            md:hidden overflow-hidden transition-all duration-300 
            ${mobileMenuOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="bg-white border rounded-lg shadow-sm py-3 mt-4">
            {menuItems.map((item, idx) => {
              const submenu = item.submenu ?? [];
              const hasSubmenu = submenu.length > 0;
              const isOpen = openIndex === idx;
              const active = !!item.active;

              return (
                <div key={item.label} className="border-b last:border-b-0">
                  <button
                    className={`w-full text-left px-4 py-3 flex items-center justify-between
                      ${active ? "bg-[#350A63] text-white" : "text-[#2D1540]"}
                    `}
                    onClick={() =>
                      hasSubmenu
                        ? setOpenIndex(isOpen ? null : idx)
                        : router.push(item.href)
                    }
                  >
                    {item.label}
                    {hasSubmenu && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d={isOpen ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}
                          stroke={active ? "#FFFFFF" : "#5A2C7A"}
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </button>

                  {hasSubmenu && isOpen && (
                    <div className="bg-white">
                      {submenu.map((s) => (
                        <a
                          key={s.href}
                          href={s.href}
                          className="block px-6 py-2 text-sm text-[#2D1540] hover:bg-gray-100"
                        >
                          {s.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* MOBILE USER INFO (mejorado, centrado y limpio) */}
            <div className="px-4 py-4 flex items-center gap-3">
              <img
                src={user.avatar}
                className="h-10 w-10 rounded-full border"
              />

              <div>
                <div className="font-semibold text-sm">{user.name}</div>
                <div className="text-xs text-gray-500">{user.role}</div>
              </div>
            </div>

            {/* Logout mobile */}
            <button
              onClick={handleLogout}
              className="text-left w-full px-4 pb-4 text-red-600 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* HAMBURGER BUTTON */
function MobileMenuButton({ onToggle }: { onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle menu"
      className="inline-flex items-center justify-center rounded-md p-2 bg-white border border-gray-200 shadow-sm"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h16M4 18h16" stroke="#2D1540" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
}
