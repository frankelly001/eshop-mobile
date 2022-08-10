import AsyncStorage from '@react-native-async-storage/async-storage';

// const key = 'USER_DATA';

const authStorageKeys = {
  USER_DATA: 'USER_DATA',
  RECENT_QUERIES: 'RECENT_QUERIES',
  RECENT_VIEWS: 'RECENT_VIEWS',
  APP_USE_READY: 'APP_USE_READY',
};

const storeUserData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    // console.log(error);
  }
};

const getUserData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    // error reading value
  }
};

const removeUserData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('REMOVE DATA FROM ASYNC STORAGE', error);
  }
};

export {storeUserData, getUserData, removeUserData, authStorageKeys};
