import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextArea from "./TextArea";
import MainButton from "./MainButton";
import ExampleText from "./ExampleText";

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
    if (situation.trim().length < 10) {
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
    <div class="h-dvh flex flex-col justify-between p-4 bg-[#1C2124] text-white">
      {/* Top: Header and textarea */}
      <div className="flex-grow max-w-xl w-full mx-auto mt-30">
        <h2 class="font-display text-white text-left text-2xl md:text-3xl mb-6 font-semibold">
          What happened?
        </h2>
        <ExampleText text="e.g My partner picked me up late from work" />

        <div>
          <TextArea
            placeholder="Explain what happened..."
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
          />
        </div>
      </div>

      {/* Bottom: Sticky Next Button */}
      <div className="pt-4 pb-6 max-w-xl w-full mx-auto">
        <MainButton onClick={handleNext} label="Next"></MainButton>
      </div>
    </div>
  );
}
