import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageLayout from "./PageLayout";
import MainButton from "./MainButton";
import PageFooter from "./PageFooter";
import SecondaryButton from "./SecondaryButton";
import MainHeader from "./MainHeader";
import SubHeader from "./SubHeader";
import FeelingsGrid from "./FeelingsGrid";

// Defining the FeelingsPage component
export default function FeelingsPage() {
  // Retrieve the situation from the previous page (SituationPage)
  const location = useLocation();
  const situation = location.state?.situation || "";

  // Hook for navigating to the RequestPage with state
  const navigate = useNavigate();

  // Predefined list of feelings with emojis (unsorted initially)
  const predefinedFeelings = [
    { label: "Angry", emoji: "😠" },
    { label: "Annoyed", emoji: "😒" },
    { label: "Confused", emoji: "😕" },
    { label: "Frustrated", emoji: "😤" },
    { label: "Sorry", emoji: "🥺" },
    { label: "Upset", emoji: "😢" },
    { label: "Hurt", emoji: "💔" },
    { label: "Worried", emoji: "😟" },
    { label: "Sad", emoji: "😞" },
    { label: "Guilty", emoji: "😬" },
    { label: "Stressed", emoji: "😣" },
    { label: "Curious", emoji: "🤔" },
  ];

  // Sort alphabetically by label
  predefinedFeelings.sort((a, b) => a.label.localeCompare(b.label));

  // State to track selected feelings (maximum 3)
  const [selectedFeelings, setSelectedFeelings] = useState(["Annoyed"]);

  // Handler for when a predefined feeling button is clicked.
  // If the feeling is already selected, it toggles it off.
  // Otherwise, it adds it if the maximum (3) has not been reached.
  const handleFeelingClick = (label) => {
    if (selectedFeelings.includes(label)) {
      // Remove the feeling if it's already selected
      setSelectedFeelings(selectedFeelings.filter((f) => f !== label));
    } else {
      // Check if the maximum of 3 feelings has been reached
      if (selectedFeelings.length >= 3) {
        alert("You can only select up to 3 feelings.");
        return;
      }

      // Add the selected feeling to the state
      setSelectedFeelings([...selectedFeelings, label]);
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
    <PageLayout
      footer={
        <PageFooter>
          <MainButton onClick={handleNext} label="Next"></MainButton>
          <div className="h-18">
            <SecondaryButton show={false} label="Give Feedback" />
          </div>
        </PageFooter>
      }
    >
      <div className="flex flex-col justify-between flex-grow text-left max-w-xl w-full mx-auto px-4 pt-5">
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <MainHeader title="How did you feel?" />
          <SubHeader copy="Select 1-3 feelings" />
        </div>

        {/* Centered Grid Section */}
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-h[340px]">
            <FeelingsGrid
              feelings={predefinedFeelings}
              selectedFeelings={selectedFeelings}
              onFeelingClick={handleFeelingClick}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
