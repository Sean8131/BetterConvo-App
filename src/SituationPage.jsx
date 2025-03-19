import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function SituationPage() {

    // Hook to enable navigation between pages
    const navigate = useNavigate();

    // State to store the user's situation
    const [situation, setSituation] = useState("");

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

            <textarea
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                rows="6"
                style={{ width: "100%", marginBottom: "20px" }}
                placeholder='e.g "My partner picked me up at 6 pm when the said they would pick me up at 5 pm."'
            />

            <div>
                <button onClick={handleBack} style={{ marginRight: "10px" }}>Back</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
}