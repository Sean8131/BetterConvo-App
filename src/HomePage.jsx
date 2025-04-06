import React from "react";
import { useNavigate } from "react-router-dom";
import MainButton from "./MainButton";

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
      <img src="/assets/BetterConvoLogo.png" alt="BetterConvo logo" className="w-28 h-auto mx-auto mb-4"></img>
      <h1 class="text-3xl md:text-4xl font-bold p-4">
        Welcome!
      </h1>

      <h2 class="text-xl md:text-2xl mb-4 font-semibold">
        BetterConvo helps you prepare for challenging conversations so you can speak with clarity, empathy, and courage.
        </h2>

      <p class="mb-4">
        Follow the prompts on the next three pages. 
      </p>
      <p class="mb-4">The app will ask you to
        provide:
      </p>

      <p class>
        <div class="flex justify-center">
          <ul class="font-medium mb-4 text-left">
            <ol>1. A description of your situation</ol>
            <ol>2. Your feelings about what happened</ol>
            <ol>3. What you would like to happen next </ol>
          </ul>
        </div>
      </p>
      <p class="mb-6">
        The app will then provide a script to help you start the conversation in a mindful way.
      </p>

    <MainButton label="Next" onClick={handleAccept}/>
    </div>
  );
}
