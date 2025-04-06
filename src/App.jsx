import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"
import HomePage from "./HomePage";
import PrivacyPage from "./PrivacyPage";
import SituationPage from "./SituationPage";
import FeelingsPage from './FeelingsPage';
import RequestPage from "./RequestPage";
import ScriptPage from "./ScriptPage";
import OnboardingOne from "./OnboardingOne"
import OnboardingIntro from "./OnboardingScreens";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing route: PrivacyPage */}
        <Route path="/" element={<OnboardingIntro />} />

        {/* Routes */}
        <Route path="/one" element=
        {<OnboardingOne />} />
        <Route path="/onboarding" element=
        {<OnboardingIntro />} />
        <Route path="/situation" element={<SituationPage />} />
        <Route path="/feelings" element={<FeelingsPage />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/script" element={<ScriptPage />} />
      </Routes>
    </Router>
  );
}

export default App;
