import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import AppLabel from '../app_label/AppLabel';
import AppInputField from '../app_input/AppInputField';
import Trash from 'assets/images/trash.svg';
import {FONTS, SPACE} from 'config/Dimension';
import Colors from 'config/Colors';
import {
  CategoryProperty,
  removeCategory,
  removeCategoryProperty,
  updatePropertyValue,
} from 'store/categorySlice';
import {useAppDispatch} from 'hooks/redux';
import Strings from 'config/Strings';

export interface ItemCategoryFieldProps extends TextProps {
  item?: CategoryProperty;
  index: number;
  categoryIndex: number;
}

export default ({item, index, categoryIndex}: ItemCategoryFieldProps) => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <AppInputField
        label={Strings.field}
        value={item?.propertyValue ?? ''}
        onChangeText={(text: string) => {
          dispatch(
            updatePropertyValue({
              categoryIndex: categoryIndex,
              propertyIndex: index,
              value: text,
            }),
          );
        }}
      />
      <View style={styles.labelContainer}>
        <AppLabel text={item?.propertyType} style={styles.label} />
      </View>
      <Pressable
        style={styles.trashContainer}
        onPress={() =>
          dispatch(
            removeCategoryProperty({
              categoryIndex: categoryIndex,
              propertyIndex: index,
            }),
          )
        }>
        <Trash />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingTop: SPACE.small,
  },
  labelContainer: {
    borderWidth: 0.5,
    justifyContent: 'center',
    marginTop: 5,
    borderColor: Colors.grey_normal,
  },
  label: {
    fontSize: FONTS.medium,
    textTransform: 'uppercase',
    paddingHorizontal: SPACE.medium,
    color: Colors.primary,
    fontWeight: '500',
  },
  trashContainer: {
    justifyContent: 'center',
    paddingHorizontal: SPACE.medium,
  },
});
