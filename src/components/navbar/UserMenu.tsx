"use client";

import { useEffect, useRef } from "react";

interface UserMenuProps {
  user: {
    name?: string;
    role?: string;
  };
  onLogout: () => void;
  onClose: () => void;
}

export default function UserMenu({ user, onLogout, onClose }: UserMenuProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Detectar clic fuera para cerrar el menú
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-[80px] w-[280px] bg-white rounded-2xl shadow-xl p-5 z-[999]"
    >
      {/* User info */}
      <div className="flex gap-3 items-center bg-gray-100 rounded-xl p-3 mb-4">
        <img
            src="/assets/user.png"
            alt="User"
            className="w-10 h-10 object-contain rounded-full"
        />
        <span className="text-lg font-medium text-[#2D1540]">
          {user.name}
        </span>
      </div>

      {/* Role item */}
      <div className="flex items-center gap-3 px-2 py-3">
        <img
          src="/assets/role-icon.png"
          alt="Role"
          className="w-8 h-8 object-contain"
        />
        <span className="text-lg text-[#2D1540]">{user.role}</span>
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-2 py-3 mt-2 text-[#0000EE] text-lg font-semibold"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0000EE"  
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 6v12" />
          <path d="M13 9l3 3-3 3" />
          <path d="M16 12H3" />
        </svg>
        Log Out
      </button>
    </div>
  );
}
