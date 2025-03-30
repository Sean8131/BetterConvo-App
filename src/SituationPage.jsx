import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyTitle from "./MyTitle";
import BlinkingTextarea from "./BlinkingTextArea";

export default function SituationPage() {
  // Hook to enable navigation between pages
  const navigate = useNavigate();

  // State to store the user's situation
  const [situation, setSituation] = useState("My partner picked me up late from work and didn't let me know");

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
      <h2 class="text-xl md:text-2xl mb-4 font-semibold">Situation</h2>
      <p class="font-medium text-base mb-2 md:text-lg">Describe what happened in your own words:</p>
      <p class="font-light text italic text-base md:text-lg mb-4 md:mb-6 ">e.g My partner picked me up late from work today</p>

        <BlinkingTextarea placeholder="Enter your situation..."
        value={situation}
        onChange={(e) => setSituation(e.target.value)}/>

      <div>
        <button className="text-purple-100 hover:bg-purple-100 hover:text-purple-950 rounded-lg border border-purple-500 py-2 px-6 text-base md:text-xl font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-[#646cff] focus:outline-none focus-visible:ring-4px" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
