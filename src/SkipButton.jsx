// components/SkipButton.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SkipButton({ show, onClick }) {
  return (
    <div className="w-full flex justify-end h-8 p-2">
      <AnimatePresence mode="wait">
        {show && (
          <motion.button
            key="skip-button"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            onClick={onClick}
            className="font-display text-sm text-gray-400 hover:text-white transition"
          >
            Skip
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
