import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'USER_DATA';

const storeUserData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    // console.log(error);
  }
};

const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    // error reading value
  }
};

const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('REMOVE DATA FROM ASYNC STORAGE', error);
  }
};

export {storeUserData, getUserData, removeUserData};
