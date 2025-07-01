import React, { useState, useEffect } from "react";
import { Moon, Sun, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }) {
  const [theme, setTheme] = useState("dark");
  const [showFilters, setShowFilters] = useState(false);

  // Apply theme class to body
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a192f] to-[#172a45] text-[#ccd6f6]">
      {/* Top Navigation */}
      <motion.header 
        className="sticky top-0 z-50 border-b border-[#1f2d48] bg-[#0a192f]/90 backdrop-blur-md shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-[#64ffda] rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0a192f]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-[#64ffda]">ResumeGuard</h1>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-[#64ffda]/10 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-[#64ffda]" />
              ) : (
                <Moon className="h-5 w-5 text-[#64ffda]" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Layout Body */}
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1">
          <motion.div 
            className="mx-auto max-w-7xl p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

// FileUploadPanel.jsx


// ResultSection.jsx

