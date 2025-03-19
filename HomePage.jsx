import React from 'react';
import { useNavigate } from 'react-router-dom';

// Define HomePage funcional component
export default function HomePage() {

    // Hook to enable navigation to other routes
    const navigate = useNavigate();

    // Handler for the "Accept" button
    // Navigates to the SituationPage when clicked
    const handleAccept = () => {
        navigate('/situation');
    };

    return(
        <div>
            <h1>Welcome to BetterConvo</h1>

            <div>
                <p>
                    Privacy Disclaimer
                </p>
            </div>
        </div>
    )
}