import {createStackNavigator} from '@react-navigation/stack';

export type HomeStackParamList = {
  Splash: undefined;
};

export const HomeStack = createStackNavigator<HomeStackParamList>();
