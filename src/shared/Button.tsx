"use client";

import React from "react";
import clsx from "clsx";

interface ButtonPrimaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ className, children, ...props }) => {
  return (
    <button
      {...props}
      className={clsx(
        "inline-flex h-11 w-full items-center justify-center rounded-full bg-primary-600 px-4 py-3 font-medium text-white transition-all hover:bg-primary-700 focus:outline-none disabled:bg-neutral-300 disabled:text-neutral-500",
        className
      )}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
