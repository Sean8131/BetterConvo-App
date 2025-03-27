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
      <h1 class="text-3xl md:text-4xl font-bold underline p-4">Welcome to BetterConvo</h1>

        <h2 class="text-base pb-4">
        BetterConvo helps you prepare for challenging conversations so you can speak with clarity, empathy, and courage.
        </h2>
        <div class="border rounded-xl p-4 mb-4">
            <p class="text-sm mb-2">
              This product uses Generative AI. At this stage of AI regulation, BetterConvo complies with current
              privacy laws.
            </p>

            <p class="text-sm mb-2">
              Please do not enter private, sensitive, or personally identifiable
              information.
            </p>

            <p class="text-sm">For more details, please review our Terms of Use.</p>
      </div>

      <button class="rounded-lg border border-transparent py-2 px-6 text-base md:text-xl font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-[#646cff] focus:outline-none focus-visible:ring-4px focus-visible:ring-[#646cff]" onClick={handleAccept}>Accept</button>
    </div>
  );
}
