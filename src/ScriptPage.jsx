// Import useLocation hook from React, which lets us access the current location object. It contains the current URL and any state passed via navigation. Here, it's used to retrieve the GPT response that was passed from the previous page.

// Import useNavigate hook from React, which returns a function we can use to change routes. Here, it's used to navigate back to the Request Input Page when the "New Request" button is pressed.

import { useLocation, useNavigate } from "react-router-dom";
import PageLayout from "./PageLayout";
import PageFooter from "./PageFooter";
import MainButton from "./MainButton";
import SecondaryButton from "./SecondaryButton";
import MainHeader from "./MainHeader";

// Component is defined as a functional component and is exported so it can be imported and used in the routing setup.

export default function ScriptPage() {
  // Retrieves the current location object, which includes the state property if any data was passed during navigation.
  const location = useLocation();

  // Returns the navigate function so we can change routes
  const navigate = useNavigate();

  // Uses optional chaining to access location.state.response. Retrieves the generated response from the navigation state. If the state exists and contains a response, the value is assigned to the response variable.
  const response = location.state?.response || "No response available.";

  // Handler for the "New Request" button to go back to the input screen
  const handleNewRequest = () => {
    navigate("/situation");
  };

  // Handler for the "Give Feedback" button
  // This function opens the Google Form in a new tab
  const handleFeedback = () => {
    window.open("https://forms.gle/M3mHbBUp3E6sD4daA");
  };

  return (
    <PageLayout
      footer={
        <PageFooter>
          <MainButton onClick={handleNewRequest} label="New Request" />
          <div className="h-18">
          <SecondaryButton 
            show={true} 
            onClick={handleFeedback} 
            label="Give Feedback" />
          </div>
        </PageFooter>
      }
    >
      <div className="max-w-xl w-full mx-auto px-4 pt-10">
        {/* Display the generated GPT response */}
        <div className="mx-auto md:w-xl pt-10">
        <MainHeader title="How about saying..." />
          <div className="text-base text-left mb-2 md:mb-4">
            <p>{response}</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}