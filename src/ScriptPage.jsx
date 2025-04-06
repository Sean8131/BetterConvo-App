// Import useLocation hook from React, which lets us access the current location object. It contains the current URL and any state passed via navigation. Here, it's used to retrieve the GPT response that was passed from the previous page.

// Import useNavigate hook from React, which returns a function we can use to change routes. Here, it's used to navigate back to the Request Input Page when the "New Request" button is pressed.

import { useLocation, useNavigate } from "react-router-dom";
import MyTitle from "./MyTitle";

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
    <div class="flex flex-col items-center mx-auto w-2xs md:w-3xl p-1">

      {/* Display the generated GPT response */}
      <div class="mx-auto md:w-xl p-2">
        <h2 class="text-left text-lg font-semibold pb-4">How about saying...</h2>

        <div class="text-left mb-2 md:mb-4"
        >
          <p>{response}</p>
        </div>
      </div>

      {/* New Request button */}
      <div className="mt-4 flex gap-6">
        <button className="text-purple-100 hover:bg-purple-100 hover:text-purple-950 rounded-lg border border-purple-500 py-2 px-6 text-base md:text-xl font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-[#646cff] focus:outline-none focus-visible:ring-4px" onClick={handleNewRequest}>New Request</button>

      {/* Feedback Section */}
      <div>
        {/* <h5 class="text-m md:text-lg md:font-semibold mt-2 md:mt-4">A message from Sean:</h5>
        <h5 class="m-2 mb-4 md:m-4 md:mb-5 text-sm md:text-base">
          Thanks for using BetterConvo! I value your input and I want
          to improve the app. Please share your feedback so I can make it even
          better for you.
        </h5> */}
        <button className="text-purple-100 hover:bg-purple-100 hover:text-purple-950 rounded-lg border border-purple-500 py-2 px-6 text-base md:text-xl font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-[#646cff] focus:outline-none focus-visible:ring-4px" onClick={handleFeedback}>Give Feedback</button>
        </div>
      </div>
    </div>
  );
}
