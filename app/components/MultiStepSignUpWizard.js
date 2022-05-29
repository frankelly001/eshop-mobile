import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {SignupScreen1, SignupScreen2, SignupScreen3} from './SignupScreens';

const MultiStepSignUpWizard = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  switch (step) {
    case 1:
      return <SignupScreen1 onNext={nextStep} />;

    case 2:
      return <SignupScreen2 onNext={nextStep} onPrev={prevStep} />;

    case 3:
      return <SignupScreen3 onPrev={prevStep} />;
    default:
      console.log('something went wrong');
  }
};

export default MultiStepSignUpWizard;
