// components/PageLayout.jsx
import React from "react";
import { motion } from "framer-motion";

export default function PageLayout({ children, footer }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5 }}
      className="h-dvh overflow-hidden touch-none overscroll-none bg-[#1C2124] text-white flex flex-col justify-between"
    >
      <div className="flex-grow w-full flex flex-col">
        {children}
      </div>

      {footer && (
        <div className="w-full px-4 pt-2 pb-6">
          {footer}
        </div>
      )}
    </motion.div>
  );
}
