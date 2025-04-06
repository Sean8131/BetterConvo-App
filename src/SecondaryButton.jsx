import React from "react";

export default function MainButton({ label = "Open to", onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-[27, 31, 35] text-[#71B7FB] font-medium px-6 py-2 rounded-full hover:opacity-90 transition-all duration-200 w-xs"
    >
      {label}
    </button>
  );
}
