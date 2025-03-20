import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SituationPage() {
  // Hook to enable navigation between pages
  const navigate = useNavigate();

  // State to store the user's situation
  const [situation, setSituation] = useState("They were late again");

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
    <div>
      <h1>BetterConvo</h1>
      <h2>Situation</h2>
      <p>Please describe what happened in your own words:</p>

        <textarea
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          rows="6"
          style={{ width: "100%", marginBottom: "20px" }}
          placeholder="e.g My partner arrived late to pick me up from work today."
        />

      <div>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
