/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {HomeRoutes} from 'routes/HomeRoutes';
import {DrawerRoutes} from 'routes/DrawerRoutes';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from 'store/store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeRoutes />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
