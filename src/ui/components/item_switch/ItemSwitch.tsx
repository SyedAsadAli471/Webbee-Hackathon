import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Switch,
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
  MachineCategory,
  removeCategoryProperty,
  updateMachineValues,
  updatePropertyValue,
} from 'store/categorySlice';
import {useAppDispatch} from 'hooks/redux';
import Strings from 'config/Strings';

export interface ItemSwitchProps extends TextProps {
  item: MachineCategory;
  machineIndex: number;
  matchineCategoryIndex: number;
}

export default ({
  isEnabled,
  toggleSwitch,
  item,
  machineIndex,
  matchineCategoryIndex,
}: ItemSwitchProps) => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={!!item.propertyValue ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={(value: boolean) =>
          dispatch(
            updateMachineValues({
              machineIndex: machineIndex,
              machineType: item.categoryName,
              machineCategoryIndex: matchineCategoryIndex,
              propertyValue: String(value),
            }),
          )
        }
        value={!!item.propertyValue}
      />
      <AppLabel text={item.propertyLabel} style={styles.label} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: SPACE.small,
    alignItems: 'center',
  },
  label: {paddingHorizontal: SPACE.small},
});
