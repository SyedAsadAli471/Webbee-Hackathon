import * as Keychain from 'react-native-keychain';
import {Category} from 'store/categorySlice';

const key = 'user_data';

const storeCategories = async (user: Category[]) => {
  try {
    await Keychain.setGenericPassword(key, JSON.stringify(user));
  } catch (error: any) {
    console.log('Error storing the user', error);
  }
};

const removeUser = async (callback?: () => void) => {
  try {
    await Keychain.resetGenericPassword();
    callback?.();
  } catch (error) {}
};

const getData = async () => {
  try {
    const userAsString = await Keychain.getGenericPassword();
    if (typeof userAsString !== 'boolean') {
      return JSON.parse(userAsString.password) as Category[];
    }
  } catch (error) {
    console.log('Error getting the user', error);
  }
};

export default {
  storeCategories,
  getData,
  removeUser,
};
