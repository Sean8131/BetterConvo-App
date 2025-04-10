import { useState } from "react";

export default function BlinkingTextarea({ 
    value,
    onChange,
    placeholder = "Type something..."}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <textarea
        className="w-full mb-2 md:mb-4 focus:outline-purple-300 focus:outline-1"
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows="6"
        placeholder={placeholder}
      />
      {/* Show custom blinking cursor only when not focused and empty */}
      {!focused && value === "" && (
        <span className="absolute left-0 text-gray-300 select-none pointer-events-none animate-blink">
          |
        </span>
      )}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1.5s step-start infinite;
        }
      `}</style>
    </div>
  );
}
