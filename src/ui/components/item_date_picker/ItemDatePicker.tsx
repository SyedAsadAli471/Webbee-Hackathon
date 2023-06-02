import React, {useState} from 'react';
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
  MachineCategory,
  removeCategory,
  removeCategoryProperty,
  updateMachineValues,
  updatePropertyValue,
} from 'store/categorySlice';
import {useAppDispatch} from 'hooks/redux';
import Strings from 'config/Strings';
import ItemSwitch from '../item_switch/ItemSwitch';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AppButton from '../app_button/AppButton';
import {formatDate} from 'utils/utils';

export interface ItemDatePickerProps extends TextProps {
  item: MachineCategory;
  machineIndex: number;
  matchineCategoryIndex: number;
}

export default ({
  item,
  machineIndex,
  matchineCategoryIndex,
}: ItemDatePickerProps) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [dob, setDob] = useState<Date | undefined>(
    item.propertyValue ? new Date(item.propertyValue) : undefined,
  );

  const dispatch = useAppDispatch();

  const hideDatePicker = () => {
    setShowDatePicker(false);
  };
  const handleConfirm = (date: Date) => {
    hideDatePicker();
    setDob(date);

    dispatch(
      updateMachineValues({
        machineIndex: machineIndex,
        machineType: item.categoryName,
        machineCategoryIndex: matchineCategoryIndex,
        propertyValue: date.toString(),
      }),
    );
  };

  return (
    <View style={styles.container}>
      <AppInputField
        disabled={true}
        label={item?.propertyLabel}
        onPressOut={() => setShowDatePicker(true)}
        value={formatDate(dob?.toString(), 'DD/MM/YYYY')}
      />

      {showDatePicker && (
        <DateTimePickerModal
          isVisible={true}
          buttonTextColorIOS={Colors.primary}
          backdropStyleIOS={{
            backgroundColor: Colors.white,
          }}
          mode="date"
          date={dob}
          isDarkModeEnabled={false}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          maximumDate={new Date()}
          modalStyleIOS={{
            marginBottom: SPACE.large,
          }}
        />
      )}
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
  cancel: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACE.medium,
    borderRadius: SPACE.borderRadius,
    backgroundColor: Colors.white,
  },
  confirm: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACE.medium,
    borderRadius: SPACE.borderRadius,
  },
});
