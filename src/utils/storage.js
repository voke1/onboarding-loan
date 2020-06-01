import AsyncStorage from '@react-native-community/async-storage';

export async function saveData(key, value) {
  AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function loadData(key) {
  const data = AsyncStorage.getItem(key);

  if (data) {
    try {
      return JSON.parse(data)
    }
    catch {
      return data;
    }
  }

  return null;

}
