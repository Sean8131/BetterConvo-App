// Import useLocation hook from React, which lets us access the current location object. It contains the current URL and any state passed via navigation. Here, it's used to retrieve the GPT response that was passed from the previous page.

// Import useNavigate hook from React, which returns a function we can use to change routes. Here, it's used to navigate back to the Request Input Page when the "New Request" button is pressed.

import { useLocation, useNavigate } from "react-router-dom";

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
    window.open("https://docs.google.com/forms");
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1>BetterConvo</h1>

      {/* Display the generated GPT response */}
      <div>
        <h2>You could start with:</h2>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "20px",
          }}
        >
          <p>{response}</p>
        </div>
      </div>

      {/* New Request button */}
      <button onClick={handleNewRequest}>New Request</button>

      {/* Feedback Section */}
      <div style={{ marginTop: "20px" }}>
        <h5>
          Thanks for using BetterConvo! I value your input and am always looking
          to improve the app. Please share your feedback so I can make it even
          better for you.
        </h5>
        <button onClick={handleFeedback}>Give Feedback</button>
      </div>
    </div>
  );
}
