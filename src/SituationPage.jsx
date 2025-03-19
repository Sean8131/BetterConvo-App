import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function SituationPage() {

    // Hook to enable navigation between pages
    const navigate = useNavigate();

    // Handler for the "Next button"
    const handleNext = () => {

        // Validate that the user has entered a non-empty situation
        if (!situation.trim()) {
            alert("Please describe the situation");
            return;
        }

        // Navigate to the FeelingsPage and pass the situation as state
        navigate("/feelings", { state: {
            situation } });
    };

    // Handler for the "Back" button
    const handleBack = () => {

        // Navigate back to the previous page in the browser history
        navigate(-1);
    };

    return (
        <div>
            <h1>BetterConvo</h1>
            <p>Please describe the situation in your own words</p>
        </div>
    )
}