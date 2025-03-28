import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyTitle from "./MyTitle";
import BlinkingTextarea from "./BlinkingTextArea";

export default function SituationPage() {
  // Hook to enable navigation between pages
  const navigate = useNavigate();

  // State to store the user's situation
  const [situation, setSituation] = useState("");

  // Handler for the "Next button"
  const handleNext = () => {
    
    // Check if the situation has a minimum character count
    if(situation.trim().length < 10) {
        alert("Please describe the situation in at least 10 characters.");
        return;
    }
    // Validate that the user has entered a non-empty situation
    if (!situation.trim()) {
      alert("Please describe what happened.");
      return;
    }

    // Navigate to the FeelingsPage and pass the situation as state
    navigate("/feelings", {
      state: {
        situation,
      },
    });
  };

  return (
    <div class="mx-auto max-width-sm md:w-xl p-2">
      <MyTitle />
      <h2 class="text-xl pb-4 font-semibold">Situation</h2>
      <p class="text-base pb-4">Describe what happened in your own words:</p>

        <BlinkingTextarea placeholder="Enter your situation..."
        value={situation}
        onChange={(e) => setSituation(e.target.value)}/>

      <div>
        <button class="rounded-lg border border-transparent py-2 px-6 text-base md:text-xl font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-[#646cff] focus:outline-none focus-visible:ring-4px focus-visible:ring-[#646cff]" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
