import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {showToast} from './AppToast/showToast';
import toast from './AppToast/toast';
import {SignupScreen1, SignupScreen2, SignupScreen3} from './SignupScreens';

const MultiStepSignUpWizard = ({step, prevStep}) => {
  switch (step) {
    case 1:
      return <SignupScreen1 />;

    case 2:
      return <SignupScreen2 onPrev={prevStep} />;

    case 3:
      return (
        <SignupScreen3
          // setValidatedValues={setValidatedValues}
          onPrev={prevStep}
        />
      );
    default:
      showToast(toast.types.ERROR, 'Something went wrong');
  }
};

export default MultiStepSignUpWizard;
