import React from "react";

export default function MainButton({ label = "Open to", onClick }) {
  return (
    <button
      onClick={onClick}
      className="font-display bg-[#71B7FB] text-black font-medium px-6 py-2 rounded-full hover:opacity-90 transition-all duration-200 w-xs mb-4"
    >
      {label}
    </button>
  );
}
