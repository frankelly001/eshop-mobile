import {useFormikContext} from 'formik';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../../config/colors';

const AppFormValidateIndicator = ({numOfFormStep, currentStep}) => {
  const steps = useCallback(() => {
    const forms = [];
    for (let i = 1; i <= numOfFormStep; i++) {
      forms.push(i);
    }
    return forms;
  }, []);

  return (
    <View style={styles.circleContainer}>
      {steps().map(stp => (
        <View
          key={stp}
          style={[
            styles.whiteCircle,
            // {opacity: step < stp ? 0.5 : 0.8},
            {
              backgroundColor:
                currentStep > stp
                  ? colors.purple
                  : currentStep < stp
                  ? colors.grey_dark
                  : colors.purple_Transparent_2,
            },
            {width: currentStep >= stp ? 10 : 6},
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
    width: '100%',
    // opacity: 0.5,
  },
  whiteCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5,
    backgroundColor: colors.purple,
  },
});

export default AppFormValidateIndicator;
