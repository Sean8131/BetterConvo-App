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

}