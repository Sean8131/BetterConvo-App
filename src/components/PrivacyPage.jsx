import React from "react";
import { useNavigate } from "react-router-dom";

// Define HomePage funcional component
export default function PrivacyPage() {
  // Hook to enable navigation to other routes
  const navigate = useNavigate();

  // Handler for the "Accept" button
  // Navigates to the SituationPage when clicked
  const handleAccept = () => {
    navigate("/homepage");
  };

  return (
    <div class="mx-auto max-width-sm md:w-xl p-2">
      <h1 class="text-3xl md:text-4xl font-bold p-4">BetterConvo</h1>

      <h2 class="text-xl md:text-2xl mb-4 font-semibold">Privacy Statement</h2>

        
        <div class="border rounded-xl p-4 mb-6">
        <p class="text-sm mb-2">
            This product uses Generative AI. 
            </p>
            <p class="text-sm mb-2">
                At this stage of AI regulation, BetterConvo complies with current
              privacy laws.
            </p>
            

            <p class="text-sm mb-2">
              Please do not enter private, sensitive, or personally identifiable
              information.
            </p>

            <p class="text-sm">For more details, please review our Terms of Use.</p>
      </div>

      <button className="text-purple-100 hover:bg-purple-100 hover:text-purple-950 rounded-lg border border-purple-500 py-2 px-6 text-base md:text-xl font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-[#646cff] focus:outline-none focus-visible:ring-4px" onClick={handleAccept}>Accept</button>
    </div>
  );
}
