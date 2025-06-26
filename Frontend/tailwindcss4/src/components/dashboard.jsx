import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { FilterPanel } from "./filterPanel";


export default function DashboardLayout({ children }) {
  const [theme, setTheme] = useState("light");
  const [showFilters, setShowFilters] = useState(false);

  // Apply theme class to body
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen bg-[#f2f1ef] ">
      {/* Top Navigation */}
      <header className="sticky top-0 z-10 border-b border-[#d9d2cc] bg-white/80 backdrop-blur-md  ">
        <div className="flex h-16 items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-[#723e31] ">
            Auto-CV Verifier
          </h1>
          
        </div>
      </header>

      {/* Layout Body */}
      <div className="flex">
        {/* Sidebar Filters */}
        {showFilters && <FilterPanel onClose={() => setShowFilters(false)} />}

        {/* Main Content */}
        <main className="flex-1">
          <div className="mx-auto max-w-7xl p-4">{children}</div>
        </main>

        {/* Mobile Filter Toggle Button */}

      </div>
    </div>
  );
}
