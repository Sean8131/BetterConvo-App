import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    if (selectedFeelings.includes(feeling)) 

          // Remove the feeling if it's already selected
      setSelectedFeelings(selectedFeelings.filter((f) => f !== feeling));
    } else {
        
        // Check if the maximum of 3 feelings has been reached
      if (selectedFeelings.length >= 3) {
        alert("You can only select up to 3 feelings.");
        return;
      }

}