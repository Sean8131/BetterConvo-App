import { useState } from "react";

export default function BlinkingTextarea({ 
    value,
    onChange,
    placeholder = "Type something..."}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <textarea
        className="border rounded-xl p-4 w-full mb-2 md:mb-4 focus:outline-purple-300"
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows="6"
        placeholder={placeholder}
      />
      {/* Show custom blinking cursor only when not focused and empty */}
      {!focused && value === "" && (
        <span className="absolute top-4 left-4 text-gray-300 select-none pointer-events-none animate-blink">
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
