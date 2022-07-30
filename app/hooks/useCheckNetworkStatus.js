import {useNetInfo} from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';
import {showToast} from '../components/AppToast/showToast';
import toast from '../components/AppToast/toast';

export const useCheckNetworkStatus = () => {
  const [justGotIn, setJustGotIn] = useState(true);
  const {isConnected, isInternetReachable} = useNetInfo();

  useEffect(() => {
    if (isConnected !== null && isInternetReachable !== null) {
      if (isConnected && isInternetReachable) {
        return justGotIn
          ? setJustGotIn(false)
          : showToast(toast.types.SUCCESS, 'Connected');
      } else {
        justGotIn && setJustGotIn(false);
        return showToast(toast.types.ERROR, "There's no Internet Connection");
      }
    }
  }, [isConnected, isInternetReachable]);
};
