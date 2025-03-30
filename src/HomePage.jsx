import React from "react";
import { useNavigate } from "react-router-dom";

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
      <h1 class="text-3xl md:text-4xl font-bold underline p-4">
        Welcome to BetterConvo
      </h1>

      <h2 class="text-xl md:text-2xl mb-4 font-semibold">
        BetterConvo helps you prepare for challenging conversations so you can speak with clarity, empathy, and courage.
        </h2>

      <p class="mb-4">
        Follow the prompts on the next three pages. The app with ask you to
        provide:
      </p>

      <p class>
        <div class="flex justify-center">
          <ul class="mb-4 text-left">
            <ol>1. A description of your situation</ol>
            <ol>2. Your feelings about what happened</ol>
            <ol>3. What you would like to happen next </ol>
          </ul>
        </div>
      </p>
      <p class="mb-4">
        BetterConvo will then provide a script to help you start the conversation in a mindful way.
      </p>

      <button
        className="text-purple-100 hover:bg-purple-100 hover:text-purple-950 rounded-lg border border-purple-500 py-2 px-6 text-base md:text-xl font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-[#646cff] focus:outline-none focus-visible:ring-4px"
        onClick={handleAccept}
      >
        Next
      </button>
    </div>
  );
}
