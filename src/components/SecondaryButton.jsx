import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SecondaryButton({ show, label, onClick }) {
  return (
    <AnimatePresence mode="wait">
            {show && (
              <motion.button
                key="skip-button"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                onClick={onClick}
                className="bg-[27, 31, 35] text-[#71B7FB] font-medium px-6 py-2 rounded-full hover:opacity-90 transition-all duration-200 w-xs mb-8"
              >
                {label}
              </motion.button>
            )}
          </AnimatePresence>
  );
}