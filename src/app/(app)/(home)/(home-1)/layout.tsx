import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      {children}
    </div>
  );
}
