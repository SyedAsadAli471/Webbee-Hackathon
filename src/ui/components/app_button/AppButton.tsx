import Colors from 'config/Colors';
import {SPACE} from 'config/Dimension';
import React from 'react';
import {StyleProp, StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import {Button, ButtonProps} from 'react-native-paper';

export interface AppButtonprops extends ButtonProps {
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}

export default ({style, onPress, ...rest}: AppButtonprops) => {
  return (
    <Button
      onPress={onPress}
      style={[styles?.button, style]}
      theme={{colors: {primary: Colors.white}}}
      uppercase={true}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    textColor: Colors.white,
    borderRadius: SPACE.borderRadius,
    textTransform: 'uppercase',
  },
});
