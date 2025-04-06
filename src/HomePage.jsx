import React from "react";
import { useNavigate } from "react-router-dom";
import MainButton from "./MainButton";
import SecondaryButton from "./SecondaryButton"
import MainHeader from "./MainHeader";
import SubHeader from "./SubHeader";

// Define HomePage funcional component
export default function HomePage() {
  // Hook to enable navigation to other routes
  const navigate = useNavigate();
  const showSecondaryButton = false;

  // Handler for the "Accept" button
  // Navigates to the SituationPage when clicked
  const handleAccept = () => {
    navigate("/situation");
  };

  return (
    <div class="min-h-screen flex flex-col justify-between bg-[#1B1F23] text-white p-4">
      <div className="flex-grow">
      <img 
        src="/assets/BetterConvoLogo.png" 
        alt="BetterConvo logo" 
        className="w-fit h-auto mx-auto mb-4"
        />
      <MainHeader title="Welcome!" />
      <SubHeader copy="BetterConvo helps you prepare for challenging conversations so you can speak with clarity, empathy, and courage." />
    </div>

    <div className="flex flex-col gap-2 items-center pb-4">
    <MainButton label="Next" onClick={handleAccept} />
    {showSecondaryButton ? (
      <SecondaryButton label="Skip" />
    ) : (
    <div className="h-[42px]" />
    )} 
      </div>
    </div>
  );
}