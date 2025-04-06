import React from "react";
import { useNavigate } from "react-router-dom";
import MainButton from "./MainButton";
import SecondaryButton from "./SecondaryButton"

// Define HomePage funcional component
export default function HomePage() {
  // Hook to enable navigation to other routes
  const navigate = useNavigate();

  // Handler for the "Accept" button
  // Navigates to the SituationPage when clicked
  const handleAccept = () => {
    navigate("/situation");
  };

  return (
    <div class="mx-auto max-width-sm md:w-xl p-2">
      <img src="/assets/BetterConvoLogo.png" alt="BetterConvo logo" className="w-fit h-auto mx-auto mb-4"></img>
      <h1 class="text-3xl md:text-4xl font-bold p-4">
        Welcome!
      </h1>

      <h2 class="text-xl md:text-2xl mb-4 font-semibold">
        BetterConvo helps you prepare for challenging conversations so you can speak with clarity, empathy, and courage.
        </h2>



    <MainButton label="Next" onClick={handleAccept}/>
    <SecondaryButton label="Skip" />
    </div>
  );
}
