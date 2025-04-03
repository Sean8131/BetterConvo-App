import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MyTitle from "./MyTitle";

// Defining the FeelingsPage component
export default function FeelingsPage() {
  // Retrieve the situation from the previous page (SituationPage)
  const location = useLocation();
  const situation = location.state?.situation || "";

  // Hook for navigating to the RequestPage with state
  const navigate = useNavigate();

  // Predefined list of feelings (unsorted initially)
  const predefinedFeelings = [
    "Angry",
    "Annoyed",
    "Confused",
    "Frustrated",
    "Grateful",
    "Upset",
    "Hurt",
    "Worried",
    "Sad",
    "Happy",
    "Stressed",
    "Curious",
  ];

  // Sort the feelings alphabetically
  predefinedFeelings.sort((a, b) => a.localeCompare(b));

  // State to track selected feelings (maximum 3)
  const [selectedFeelings, setSelectedFeelings] = useState(["Hurt"]);

  // Handler for when a predefined feeling button is clicked.
  // If the feeling is already selected, it toggles it off.
  // Otherwise, it adds it if the maximum (3) has not been reached.
  const handleFeelingClick = (feeling) => {
    if (selectedFeelings.includes(feeling)) {
      // Remove the feeling if it's already selected
      setSelectedFeelings(selectedFeelings.filter((f) => f !== feeling));
    } else {
      // Check if the maximum of 3 feelings has been reached
      if (selectedFeelings.length >= 3) {
        alert("You can only select up to 3 feelings.");
        return;
      }

      // Add the selected feeling to the state
      setSelectedFeelings([...selectedFeelings, feeling]);
    }
  };

  // Handler for the "Next" button.
  // Checks if at least one feeling has been selected.
  // If so, navigates to the RequestPage and passes the selected feelings in state.
  const handleNext = () => {
    if (selectedFeelings.length === 0) {
      alert("Please select at least one feeling.");
      return;
    }

    // Navigate to RequestPage, passing both the situation and selected feelings
    navigate("/request", { state: { situation, feelings: selectedFeelings } });
  };

  // Handler for the "Back" button
  const handleBack = () => {
    // Navigate back to the previous page in the browser history
    navigate(-1);
  };

  return (
    <div class="text-left mx-auto max-width-sm md:w-xl p-2">
      {/* Page header */}
      <h2 class="text-xl md:text-2xl mb-4 font-semibold">How did you feel?</h2>
      <p class="font-medium text-base mb-6 md:text-lg">
        Select 1-3 feelings
      </p>

      {/* Display predefined feelings as buttons arranged in 3 columns */}
      <div class="grid grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-10">
        {predefinedFeelings.map((feeling) => (
          <button
            key={feeling}
            onClick={(e) => {
              handleFeelingClick(feeling);

              // Force blur after click
              setTimeout(() => e.target.blur(), 0);
            }}
            // Hide default tap highlight on WebKit-based browsers
            style={{ WebkitTapHighlightColor: "transparent" }}
            className={`text-purple-100 border-purple-200  rounded-lg border py-2 px-3 text-sm md:text-xl font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 ${
              selectedFeelings.includes(feeling)
                ? "bg-purple-100 text-purple-950"
                : ""
            }`}
          >
            {feeling}
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div class="flex justify-center gap-2">
        <button
          className="text-purple-100 hover:bg-purple-100 hover:text-purple-950 rounded-lg border border-purple-500 py-2 px-6 text-base md:text-xl font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-[#646cff] focus:outline-none focus-visible:ring-4px"
          onClick={handleBack}
          style={{ marginRight: "10px" }}
        >
          Back
        </button>
        <button
          className="text-purple-100 hover:bg-purple-100 hover:text-purple-950 rounded-lg border border-purple-500 py-2 px-6 text-base md:text-xl font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-[#646cff] focus:outline-none focus-visible:ring-4px"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
