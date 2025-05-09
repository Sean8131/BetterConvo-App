import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextArea from "./TextArea";
import MainButton from "./MainButton";
import ExampleText from "./ExampleText";
import PageLayout from "./PageLayout";
import PageFooter from "./PageFooter";
import SecondaryButton from "./SecondaryButton";
import MainHeader from "./MainHeader";

export default function SituationPage() {
  const navigate = useNavigate();
  const [situation, setSituation] = useState(
    ""
  );

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
        <PageFooter>
          <MainButton onClick={handleNext} label="Next" />
          <div className="h-18">
                    <SecondaryButton 
                      show={false}
                      label="Give Feedback" />
                    </div>
        </PageFooter>
      }
    >
      <div className="text-left max-w-xl w-full mx-auto px-4 pt-20">
        <MainHeader title="What happened?" />
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