import React from "react";

export default function StepDots({ totalSteps, currentStep }) {
  return (
    <div className="flex gap-2 mb-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-2 w-2 rounded-full ${
            index === currentStep ? "bg-white" : "bg-gray-600"
          }`}
        />
      ))}
    </div>
  );
}
