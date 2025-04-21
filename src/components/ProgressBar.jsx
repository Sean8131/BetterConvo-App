import React from "react";
import { useLocation } from "react-router-dom";

const steps = ["/situation", "/feelings", "/request", "/script"];
const hideOnRoutes = ["/", "/onboardingScreens",]

export default function ProgressBar() {
  const { pathname } = useLocation();

  if (hideOnRoutes.includes(pathname)) return null;
  
  const stepIndex = steps.indexOf(pathname);
  const progress = ((stepIndex + 1) / steps.length) * 100;

  return (
    <div className="w-full px-4 mt-2">
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-2 rounded-full transition-all duration-3000 ease-in-out"
          style={{ width: `${progress}%`, backgroundColor: "#37C998" }}
        ></div>
      </div>
    </div>
  );
}
