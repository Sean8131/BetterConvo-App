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
      <h1 class="text-3xl md:text-4xl font-bold underline p-4">Welcome to BetterConvo</h1>

        <h2 class="text-base pb-4">
          BetterConvo is designed to support you in preparing for courageous
          conversations using Generative AI.
        </h2>
        <div class="border rounded-xl p-4 mb-4"style={{
        }}>
            <p class="text-sm mb-2">
              At this stage of AI regulation, this product complies with current
              privacy laws.
            </p>

            <p class="text-sm mb-2">
              Please do not enter private, sensitive, or personally identifiable
              information. It is your responsibility to ensure that you do not
              share confidential details. By using BetterConvo, you acknowledge
              that: your inputs are processed in real time and not stored;
              AI-generated responses are for guidance only and should not
              replace professional advice; you are responsible for how you use
              the generated content in your personal conversations.
            </p>

            <p class="text-sm">For more details, please review our Terms of Use.</p>
      </div>

      <button class="rounded-lg border border-transparent py-1 px-3 text-base font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-[#646cff] focus:outline-none focus-visible:ring-4px focus-visible:ring-[#646cff]" onClick={handleAccept}>Accept</button>
    </div>
  );
}
