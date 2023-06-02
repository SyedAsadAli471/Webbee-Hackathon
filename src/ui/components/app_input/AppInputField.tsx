import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {TextInput, TextInputProps} from 'react-native-paper';

export interface AppInputProps extends TextInputProps {
  label: string;
  value: string;
  style?: StyleProp<ViewStyle>;
  onChangeText: (text: string) => void;
}

export default ({
  label,
  value,
  style,
  onChangeText,
  ...rest
}: AppInputProps) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      style={[styles.default, style]}
      underlineColor="transparent"
      mode="outlined"
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  default: {flex: 1},
});
