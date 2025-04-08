import React from "react";

export default function ExampleText({ text="example" }) {
  return (
    <p className="text-gray-300 text-left italic text-sm md:text-lg mb-6 md:mb-8"
    >
        {text}
    </p>
  );
}
