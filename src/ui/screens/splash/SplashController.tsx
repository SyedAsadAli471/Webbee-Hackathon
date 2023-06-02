import React, {useLayoutEffect} from 'react';
import {Text} from 'react-native-paper';
import {View} from 'react-native';
import {DrawerRoutes} from 'routes/DrawerRoutes';
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from 'store/local/AsyncStorage';
import {useAppDispatch} from 'hooks/redux';
import {addDataFromStore} from 'store/categorySlice';

export const SplashController = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const restoreData = async () => {
    let data = await AsyncStorage.getData();

    if (data) {
      dispatch(addDataFromStore(data));
    }
  };

  useLayoutEffect(() => {
    restoreData();
  }, []);

  return <DrawerRoutes />;
};
