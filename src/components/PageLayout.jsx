import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BackArrow from "./BackArrow";
import useLockViewportHeight from "../hooks/useLockViewportHeight.js";

export default function PageLayout({ children, footer, showBack = true, onBack, scrollable = false }) {
  useLockViewportHeight();
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="h-[calc(var(--vh,_1vh)_*_100)] bg-[#1C2124] text-white flex flex-col justify-start max-w-xl w-full mx-auto">
  {/* Top Back Arrow */}
  {showBack && (
    <div className="w-full px-2 pt-4 sticky top-0 z-10 bg-[#1C2124]">
      <div className="w-10">
      <BackArrow onClick={handleBack} />
      </div>
    </div>
  )}

  {/* Animate only the content */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
    className={`flex-grow w-full flex flex-col items-center ${scrollable ? 'overflow-y-auto overscroll-none' : 'overflow-hidden'}`}
  >
    {children}
  </motion.div>

  {/* Footer */}
  {footer && (
    <div className="w-full px-4 pt-2 pb-6 min-h-[120px] flex items-center justify-center">
      {footer}
    </div>
  )}
</div>

  );
}
