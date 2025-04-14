import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import MainButton from "./MainButton";
import PageLayout from "./PageLayout";
import SecondaryButton from "./SecondaryButton";
import PageFooter from "./PageFooter";
import StepDots from "./StepDots";

// Config flag to turn onboarding on and off
// Set to false to re-enablel onboarding
const SKIP_ONBOARDING = false;

const onboardingScreens = [
  {
    title: "Welcome to BetterConvo",
    subtitle:
      "This app helps you prepare for challenging conversations so you can speak with clarity, empathy, and courage.",
    image: "/assets/BetterConvo_Illustration_Conversation.png",
  },
  {
    title: "How it works",
    subtitle:
      "You’ll respond to three prompts: your situation, your feelings, and your request.",
    image: "/assets/BetterConvo_Illustration_Checklist.png",
  },
  {
    title: "Get your script",
    subtitle:
      "We’ll generate a script to help you begin your conversation with clarity.",
    image: "/assets/BetterConvo_Illustration_Textbox.png",
  },
  {
    title: "Protecting Your Privacy",
    subtitle:
      "This product uses Generative AI. Please do not enter private, sensitive, or personally identifiable information.\n\nFor more details, please review our Terms of Use.",
    image: "/assets/BetterConvo_Illustration_Lock_Privacy.png",
  },
];

export default function OnboardingIntro() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();
  const isLast = step === onboardingScreens.length - 1;

  useEffect(() => {
    const hasOnboarded = localStorage.getItem("hasOnboarded");
    if (SKIP_ONBOARDING && hasOnboarded === "true") {
      navigate("/situation");
    }
  }, [navigate]);

  const handleNext = () => {
    if (isLast) {
      localStorage.setItem("hasOnboarded", "true");
      navigate("/situation");
    } else {
      setDirection(1);
      requestAnimationFrame(() => setStep(step + 1));
    }
  };

  const handleSkip = () => {
    localStorage.setItem("hasOnboarded", "true");
    navigate("/situation");
  };

  const { title, subtitle, image } = onboardingScreens[step];

  return (
    <PageLayout
    showBack={false}
  footer={
    <PageFooter>
    {/* <div className="flex flex-col items-center gap-2"> */}
      <MainButton
        label={isLast ? "Let’s begin! 🚀" : "Next"}
        onClick={handleNext}
      />
      <div
        className={isLast ? "invisible h-18" : ""}>
      <SecondaryButton
        show={true} // always render
        onClick={handleSkip}
        label= "Skip" />
        </div>
    {/* </div> */}
  </PageFooter>
  }
  >
  
  {/* Main content here */}
  <AnimatePresence mode="wait" initial={false}>
    <motion.div
      className="flex flex-col items-center justify-center text-center flex-grow overflow-hidden px-2"
      key={step}
      initial={{ x: direction * 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -direction * 300, opacity: 0 }}
      transition={{ duration: 0.5 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e, info) => {
        const swipeThreshold = 100;
        const swipe = info.offset.x;
        
        if (swipe < -swipeThreshold && step < onboardingScreens.length - 1) {
          setDirection(1);
          requestAnimationFrame(() => setStep(step + 1));
        } else if (swipe > swipeThreshold && step > 0) {
          setDirection(-1);
          requestAnimationFrame(() => setStep(step - 1));
        }
      }}
    >
      <img
        src={image}
        alt={title}
        className="w-64 h-auto mb-6 object-contain"
      />
      <h1 className="font-display text-2xl font-bold mb-2">{title}</h1>
      <p className="text-md max-w-sm whitespace-pre-line">
        {step === 3 ? (
          <>
            This product uses Gen AI. Don't enter personally
            identifiable info.
            For more details, please read our{" "}
            <a
              href="/terms"
              className="underline text-blue-400 hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Use
            </a>
            .
          </>
        ) : (
          subtitle
        )}
      </p>
    </motion.div>
  </AnimatePresence>
<StepDots totalSteps={onboardingScreens.length} currentStep={step}/>
</PageLayout>
  );
}
