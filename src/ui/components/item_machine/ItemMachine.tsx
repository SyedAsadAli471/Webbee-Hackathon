import React, {useCallback} from 'react';
import {FlatList, Pressable, StyleSheet, TextProps, View} from 'react-native';
import AppLabel from '../app_label/AppLabel';
import AppInputField from '../app_input/AppInputField';
import Trash from 'assets/images/trash.svg';
import {SPACE} from 'config/Dimension';
import Colors from 'config/Colors';
import {
  MachineCategory,
  removeMachine,
  updateMachineValues,
} from 'store/categorySlice';
import {useAppDispatch} from 'hooks/redux';
import Strings from 'config/Strings';
import ItemSwitch from '../item_switch/ItemSwitch';
import ItemDatePicker from '../item_date_picker/ItemDatePicker';
import {shadowStyleProps} from 'utils/utils';

export interface ItemMachineProps extends TextProps {
  item?: MachineCategory[];
  machineIndex: number;
}

export default ({item, machineIndex}: ItemMachineProps) => {
  const dispatch = useAppDispatch();

  // console.log('item Machine : ', item);
  const renderItem = useCallback(
    ({item, index}: {item: MachineCategory; index: number}) => {
      return (
        <>
          {item?.propertyType === 'Checkbox' && (
            <ItemSwitch
              item={item}
              machineIndex={machineIndex}
              matchineCategoryIndex={index}
            />
          )}
          {item?.propertyType === 'Date' && (
            <ItemDatePicker
              item={item}
              machineIndex={machineIndex}
              matchineCategoryIndex={index}
            />
          )}
          {item?.propertyType === 'Number' && (
            <AppInputField
              label={item?.propertyLabel!}
              value={item.propertyValue}
              keyboardType={'numeric'}
              onChangeText={(text: string) => {
                dispatch(
                  updateMachineValues({
                    machineIndex: machineIndex,
                    machineType: item.categoryName,
                    machineCategoryIndex: index,
                    propertyValue: text,
                  }),
                );
              }}
            />
          )}
          {item?.propertyType === 'Text' && (
            <AppInputField
              label={item?.propertyLabel!}
              value={item.propertyValue}
              onChangeText={(text: string) => {
                dispatch(
                  updateMachineValues({
                    machineIndex: machineIndex,
                    machineType: item.categoryName,
                    machineCategoryIndex: index,
                    propertyValue: text,
                  }),
                );
              }}
            />
          )}
        </>
      );
    },
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={item}
        renderItem={renderItem}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
      <Pressable
        style={styles.trash}
        onPress={() =>
          dispatch(
            removeMachine({
              machineIndex: machineIndex,
              machineType: item?.[0]?.categoryName,
            }),
          )
        }>
        <Trash fill={Colors.primary} />
        <AppLabel text={Strings.remove} style={styles.removeLabel} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: SPACE.small,
    backgroundColor: Colors.white,
    borderRadius: SPACE.borderRadius,
    borderColor: Colors.grey_normal,
    padding: SPACE.small,
    ...shadowStyleProps,
  },
  list: {flex: 1},
  listContent: {paddingHorizontal: SPACE.medium, paddingTop: SPACE.small},
  trash: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACE.small,
    paddingTop: SPACE.smallMedium,
    paddingBottom: SPACE.smallMedium,
  },
  removeLabel: {
    color: Colors.primary,
    paddingStart: SPACE.small,
    textTransform: 'uppercase',
  },
});
