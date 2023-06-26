import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getStorage<T = any>(item: string): Promise<T> {
  const storage = await AsyncStorage.getItem(item);
  if (storage) {
    return JSON.parse(storage);
  }
  return storage as T;
}

export async function setStorage<T = any>(item: string, value: string) {
  const storage = await AsyncStorage.setItem(item, value);
  return storage as T;
}
