import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextArea from "./TextArea";


export default function SituationPage() {
  // Hook to enable navigation between pages
  const navigate = useNavigate();

  // State to store the user's situation
  const [situation, setSituation] = useState("");

  // Handler for the "Next button"
  const handleNext = () => {

    // Validate that the user has entered a non-empty situation
    if (!situation.trim()) {
      alert("Please describe what happened.");
      return;
    }
    
    // Check if the situation has a minimum character count
    if(situation.trim().length < 10) {
        alert("Please describe the situation in at least 10 characters.");
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
      <h2 class="font-display text-left text-xl md:text-2xl mb-4 font-semibold">What happened?</h2>
      {/* <p class="font-medium text-base mb-2 md:mb-4 md:text-lg">Describe what happened:</p> */}
      <p class="text-left font-extralight text italic text-base md:text-lg mb-6 md:mb-8 ">e.g My partner picked me up late from work</p>

        <div class="mb-4">
        <TextArea
        placeholder="Explain what happened"
        value={situation}
        onChange={(e) => setSituation(e.target.value)}
        />




        </div>
      <div>
        <button className="font-display text-purple-100 hover:bg-purple-100 hover:text-purple-950 rounded-lg border border-purple-500 py-2 px-6 text-base md:text-xl font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-[#646cff] focus:outline-none focus-visible:ring-4px" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
