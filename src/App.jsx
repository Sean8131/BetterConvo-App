import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import "./App.css"
import SituationPage from "./SituationPage";
import FeelingsPage from './FeelingsPage';
import RequestPage from "./RequestPage";
import ScriptPage from "./ScriptPage";
import OnboardingIntro from "./OnboardingScreens";
import TermsOfUse from "./TermsOfUse";
import { useEffect } from "react";

function App() {
useEffect(() => {
  const existingId = localStorage.getItem('session_id');
  if (!existingId) {
    localStorage.setItem('session_id', uuidv4());
  }
}, []);

  return (
    <Router>
      <Routes>
        {/* Landing route: PrivacyPage */}
        <Route path="/" element={<OnboardingIntro />} />

        {/* Routes */}
        <Route path="/onboarding" element={<OnboardingIntro />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/situation" element={<SituationPage />} />
        <Route path="/feelings" element={<FeelingsPage />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/script" element={<ScriptPage />} />
      </Routes>
    </Router>
  );
}

export default App;
