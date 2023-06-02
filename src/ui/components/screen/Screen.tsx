import Colors from 'config/Colors';
import React, {Children} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';

export interface ScreenProps extends ViewProps {}

type Props = ScreenProps;

const Screen: React.FC<Props> = ({children}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors.white,
        },
      ]}>
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: Colors.white,
          },
        ]}>
        <StatusBar translucent={true} barStyle={'light-content'} />
        {children}
      </SafeAreaView>
    </View>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'red',
  },
  wrapper: {
    flex: 1,
  },
  bottomSafeArea: {
    width: '100%',
    alignSelf: 'flex-end',
  },
});
