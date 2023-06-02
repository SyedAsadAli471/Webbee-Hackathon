import React from 'react';
import {StyleProp, StyleSheet, Text, TextProps, TextStyle} from 'react-native';

export interface AppLabelProps extends TextProps {
  text?: string;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}

export default ({text, style, onPress}: AppLabelProps) => {
  return (
    <Text style={[styles.label, style]} onPress={onPress}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  label: {},
});
