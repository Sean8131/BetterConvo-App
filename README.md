# BetterConvo Project Brief

## Objective
BetterConvo is a mobile only web application that helps users prepare for courageous conversations with their partner using Nonviolent Communication (NVC). Users will input a situation, select a feeling, and enter a request. A generative AI model (GPT) will provide a suggested script to help them start their conversation with curiosity, empathy, and courage.

## Features In Scope

### User Inputs
- A situation input field for users to describe their context.  
- A feelings list with predefined emotions.  
- A request input field where users state what they want.  
- A generate button that submits the inputs to the AI.  

### AI-Powered Script Generation
- User inputs are sent to an API request.  
- A serverless function calls the OpenAI API to generate a script.  
- The response is displayed on the user's screen.  

### Security & Compliance
- No user data is stored.
- API key is secured using Vercel environment variables.  
- A disclaimer appears when the app loads, advising users not to enter private information.  

### Deployment & Hosting
- **Frontend:** React + TailwindCSS, deployed on Vercel.  
- **Backend:** Vercel Serverless Functions (instead of a full Express.js backend).

## User Stories & Acceptance Criteria

### 1. User Sees a Disclaimer Upon Opening the App
As a user, I want to see a disclaimer before using the app so that I understand privacy guidelines.  

#### Acceptance Criteria:
- When the app loads, a disclaimer message appears.  
- The disclaimer advises users not to enter private information.  
- A **"Terms of Use"** hyperlink is displayed.
- An **"Accept"** button is displayed.
- When the user clicks the **"Accept"** button, the disclaimer disappears and the **"Main Screen"** opens.

### User Story 2: Inputting a Situation
As a user, I want to enter my situation so that I can receive relevant guidance.

#### Acceptance Criteria:
- The user can enter a text description in the situation input field.  
- When the user clicks the **"Done"** button, they are taken back to the **"Main Screen"**.
- If all inputs are completed, then the user is taken to the **"Generate Screen"**.

### User Story 3: Selecting a Feeling
As a user, I want to choose from a list of feelings so that I can accurately describe my emotions.

#### Acceptance Criteria:
- When the user clicks the feelings button, a list is displayed.
- The list contains a predefined set of feelings.  
- The user must select at least one feeling before generating the script.
- The user can select up to three feelings from the list.
- Clicking a feeling highlights it to show it has been selected.
- Clicking a highlighted feeling button de-selects and unhighlights the button.
- When the user clicks the **"Done"** button, they are taken back to the **"Main Screen"**.
- If all inputs are completed, then the user is taken to the **"Generate Screen"**.

### User Story 3: Submitting a Request
As a user, I want to specify what I need from my partner so that the response reflects my needs.

#### Acceptance Criteria:
- The user can enter text in the request input field.
- When the user clicks the **"Done"** button, they are taken back to the **"Main Screen"**.
- If all inputs are completed, then the user is taken to the **"Generate Screen"**.

### User Story 4: Generating the Script
As a user, I want to generate an NVC-based script so that I can prepare for my conversation.

#### Acceptance Criteria:
- Clicking the **"Generate"** button sends user inputs to the backend.  
- The API processes the inputs and returns a structured response.  
- The script is displayed in a readable format.  
- If there is an API error, the user sees an error message instead of a blank screen.

### User Story 5: Regenerating a Script
As a user I want to regenerate a new script so that I can see an alternative response if I don’t like the first one.  

#### Acceptance Criteria:  
- A **"Regenerate"** button is displayed after the script is generated.  
- Clicking the **"Regenerate"** button sends the same user inputs to the API and retrieves a new response.  
- The new response replaces the previous script.  
- If the API fails, the user sees an error message instead of a blank screen.  

### User Story 6: Starting a New Request
As a user, I want to clear my inputs and start over so that I can generate a new script for a different situation.  

#### Acceptance Criteria:
- A **"New Request"** button is displayed after the script is generated.  
- Clicking the **"New Request"** button clears all inputs (situation, feeling, and request). 
- The user is taken back to the **"Main Screen"**.  


## **Out of Scope**  
- **User Accounts & Authentication** - No logins, profiles, or saved data.  
- **Data Storage** - No database or history of user interactions.  
- **Advanced AI Customisation** - GPT responses are based on a fixed prompt.  
- **Multi-Turn Conversations** - The app provides a single response per request.
- **Responsive Design** - Mobile-only design won't be optimised for desktop screens.

## BetterConvo Project Timeline (4.5 Weeks)

###  Project Start: February 26, 2025

#### 1. Project Proposal (Feb 26, 2025)
- Finalise the project scope, user stories, and deployment plan.  

#### 2. Development Phase (Feb 27 – Mar 15, 2025)
- Build the UI using React and TailwindCSS.  
- Integrate Vercel serverless functions to handle API requests.  

#### 3. Testing & Debugging (Mar 16 – Mar 22, 2025)
- Test API integration and ensure correct responses.  
- Fix UI bugs and improve error handling.  
- Refine the AI-generated response formatting.  

#### 4. Beta Test & Fixes (Mar 23 – Mar 28, 2025)
- Conduct final user testing to catch any remaining issues.  
- Ensure compliance with scope and project requirements.  
- Polish UI and optimise performance.  

#### 5. Final Submission (Mar 31, 2025)
- Submit the completed project for evaluation.  

#### 6. Presentation/Demo Day (TBD)
- Prepare for and present BetterConvo.  