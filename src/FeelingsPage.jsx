import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Defining the FeelingsPage component
export default function FeelingsPage() {

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
    "Overwhelmed",
    "Worried",
    "Sad",
    "Happy",
    "Stressed",
    "Curious",
  ];

  // Sort the feelings alphabetically
  predefinedFeelings.sort((a, b) => a.localeCompare(b));

  // State to track selected feelings (maximum 3)
  const [selectedFeelings, setSelectedFeelings] = useState([]);

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

      // Navigate to RequestPage with the selected feelings
      navigate("/request", { state: { feelings: selectedFeelings } });
    };

    return (
        <div>
          {/* Page header */}
          <h1>BetterConvo</h1>
          <p>How are you feeling? Please select 1-3 feelings</p>
          
          {/* Display predefined feelings as buttons arranged in 3 columns */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
              marginBottom: "20px"
            }}
          >
            {predefinedFeelings.map((feeling) => (
              <button
                key={feeling}
                onClick={() => handleFeelingClick(feeling)}
                // Simple inline styling to indicate selection
                style={{
                  backgroundColor: selectedFeelings.includes(feeling) ? "#ccc" : ""
                }}
              >
                {feeling}
              </button>
            ))}
          </div>
    
          {/* "Next" button to proceed to the RequestPage */}
          <button onClick={handleNext}>Next</button>
        </div>
      );
}