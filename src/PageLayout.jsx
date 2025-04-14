import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function PageLayout({ children, footer, showBack = true, onBack }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.0 }}
      className="h-dvh overflow-hidden touch-none overscroll-none bg-[#1C2124] text-white flex flex-col justify-between"
    >
      {/* Top Back Arrow */}
      {showBack && (
        <div className="w-full flex justify-start px-4 pt-4">
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="text-white hover:text-purple-300 transition text-2xl"
          >
            ←
          </button>
        </div>
      )}

      {/* Main content */}
      <div className="flex-grow w-full flex flex-col items-center">
        {children}
      </div>
      {/* Footer */}
      {footer && (
        <div className="w-full px-4 pt-2 pb-6 min-h-[120px] flex items-center justify-center">
          {footer}
        </div>
      )}
    </motion.div>
  );
}
