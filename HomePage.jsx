import React from "react";
import { useNavigate } from "react-router-dom";

// Define HomePage funcional component
export default function HomePage() {
  // Hook to enable navigation to other routes
  const navigate = useNavigate();

  // Handler for the "Accept" button
  // Navigates to the SituationPage when clicked
  const handleAccept = () => {
    navigate("/situation");
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1>Welcome to BetterConvo</h1>

      <div>
        <h3>
          BetterConvo is designed to support you in preparing for courageous
          conversations using Generative AI.
        </h3>
        <div>
          <p>
            <p>
              At this stage of AI regulation, this product complies with current
              privacy laws.
            </p>

            <p>
              Please do not enter private, sensitive, or personally identifiable
              information. It is your responsibility to ensure that you do not
              share confidential details. By using BetterConvo, you acknowledge
              that: your inputs are processed in real time and not stored;
              AI-generated responses are for guidance only and should not
              replace professional advice; you are responsible for how you use
              the generated content in your personal conversations.
            </p>

            <p>For more details, please review our Terms of Use.</p>
          </p>
        </div>
      </div>

      <button onClick={handleAccept}>Accept</button>
    </div>
  );
}
