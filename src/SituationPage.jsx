import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyTitle from "./MyTitle";

export default function SituationPage() {
  // Hook to enable navigation between pages
  const navigate = useNavigate();

  // State to store the user's situation
  const [situation, setSituation] = useState("My partner forgot my birthday");

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
    <div class="mx-auto w-2xs md:w-3xl p-2">
      <MyTitle />
      <h2 class="text-xl pb-4 font-semibold">Situation</h2>
      <p class="text-base pb-4">Please describe what happened in your own words:</p>

        <textarea class="border rounded-xl p-4 mb-4"
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          rows="6"
          style={{ width: "100%", marginBottom: "20px" }}
          placeholder="e.g My partner arrived late to pick me up from work today."
        />

      <div>
        <button class="rounded-lg border border-transparent py-2 px-6 text-base md:text-xl font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-[#646cff] focus:outline-none focus-visible:ring-4px focus-visible:ring-[#646cff]" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
