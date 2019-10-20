import React, { createContext, useState } from 'react';

interface StepProps {
  children: React.ReactNode;
}

export enum OrderStep {
  Meal,
  Restaurant,
  Dish,
  Review
}

const StepContext = createContext({
  activeStep: 0,
  currentStep: 0,
  setActiveStep: (_: number) => {},
  setCurrentStep: (_: number) => {},
  stepNext: () => {},
  stepPrev: () => {}
});

const StepProvider = ({ children }: StepProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const updateActiveStep = (n: number) => {
    if (n <= currentStep) {
      setActiveStep(n);
    }
  };

  const updateCurrentStep = (n: number) => {
    setCurrentStep(n);
  };

  const stepNext = () => {
    const nextStep = activeStep + 1;
    if (activeStep === currentStep) {
      setActiveStep(nextStep);
      setCurrentStep(nextStep);
    } else {
      setActiveStep(nextStep);
    }
  };

  const stepPrev = () => {
    const prevStep = activeStep - 1;
    setActiveStep(prevStep);
  };

  return (
    <StepContext.Provider
      value={{
        activeStep,
        currentStep,
        setActiveStep: updateActiveStep,
        setCurrentStep: updateCurrentStep,
        stepNext,
        stepPrev
      }}
    >
      {children}
    </StepContext.Provider>
  );
};

export { StepContext, StepProvider };
