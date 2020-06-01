import AsyncStorage from '@react-native-community/async-storage';

export const persistNavigationState = async (persistenceKey, navState) => {
  try {
    await AsyncStorage.setItem(persistenceKey, JSON.stringify(navState));
  } catch (err) {
    // TODO handle the error
  }
};

export const loadNavigationState = async (persistenceKey) => {
  const jsonString = await AsyncStorage.getItem(persistenceKey);
  return JSON.parse(jsonString);
};
