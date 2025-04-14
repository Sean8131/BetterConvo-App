import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextArea from "./TextArea";
import MainButton from "./MainButton";
import ExampleText from "./ExampleText";
import PageLayout from "./PageLayout";

export default function SituationPage() {
  const navigate = useNavigate();
  const [situation, setSituation] = useState("My flatmate didn't clean the shower when it was their turn to clean the bathroom this week");

  const handleNext = () => {
    if (!situation.trim()) {
      alert("Please describe what happened.");
      return;
    }

    if (situation.trim().length < 10) {
      alert("Please describe the situation in at least 10 characters.");
      return;
    }

    navigate("/feelings", {
      state: { situation },
    });
  };

  return (
    <PageLayout
      footer={
        <div className="max-w-xl w-full mx-auto">
          <MainButton onClick={handleNext} label="Next" />
        </div>
      }
    >
      <div className="max-w-xl w-full mx-auto px-4 mt-20">
        <h2 className="font-display text-white text-left text-2xl md:text-3xl mb-6 font-semibold">
          What happened?
        </h2>
        <ExampleText text="e.g My partner picked me up late from work" />
        <TextArea
          placeholder="Explain what happened..."
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
        />
      </div>
    </PageLayout>
  );
}
