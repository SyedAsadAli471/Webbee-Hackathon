import React, {FC} from 'react';
import {SplashController} from 'ui/screens/splash/SplashController';
import {DrawerRoutes} from './DrawerRoutes';
import {HomeStack, HomeStackParamList} from './HomeStack';

type Props = {
  initialRouteName?: keyof HomeStackParamList;
};

export const HomeRoutes: FC<Props> = ({initialRouteName}) => {
  return (
    <HomeStack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <HomeStack.Screen
        name="Splash"
        component={SplashController}
        options={{
          headerShown: false,
        }}
      />

      <HomeStack.Screen
        name="drawer"
        component={DrawerRoutes}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};
