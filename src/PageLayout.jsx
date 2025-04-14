import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BackArrow from "./BackArrow";

export default function PageLayout({ children, footer, showBack = true, onBack, scrollable = false }) {
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
      transition={{ duration: 1.5 }}
      className="h-dvh bg-[#1C2124] text-white flex flex-col justify-between"
    >
      {/* Top Back Arrow */}
      {showBack && (
        <div className="w-full flex justify-start pt-4">
          <BackArrow onClick={handleBack} />
        </div>
      )}

      {/* Main content */}
      <div className={`flex-grow w-full flex flex-col items-center ${scrollable ? 'overflow-y-auto' : 'overflow-x-hidden'}`}>
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
