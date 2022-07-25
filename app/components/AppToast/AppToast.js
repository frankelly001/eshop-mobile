import React from 'react';
import {Text, View} from 'react-native';
// import { colors } from "../../config/config";
// import { Google } from "../../constants/images";
// import { appToastTypes } from "../../helpers/toastTypes";

// import {styles} from './styles';

const AppToast = ({message, type, ...props}) => {
  //   let formattedType = type?.toLowerCase();
  console.log('apptoast is logging');

  return (
    <View
      // {...props}
      style={{height: 50, width: '100%', backgroundColor: 'red'}}>
      {/* {displayIconBasedOnType()} */}
      <View>
        <Text>{message}</Text>
      </View>
    </View>
  );
};

export default AppToast;
