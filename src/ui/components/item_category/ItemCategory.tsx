import React, {useCallback, useEffect, useRef} from 'react';
import {
  FlatList,
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
import ModalSelector from 'react-native-modal-selector';
import Strings from 'config/Strings';
import {useAppDispatch, useAppSelector} from 'hooks/redux';
import {RootState} from 'store/store';
import {
  addCategoryProperty,
  Category,
  CategoryProperty,
  PropertyType,
  removeCategory,
  updatePropertyValue,
  updateTitleField,
} from 'store/categorySlice';
import ItemCategoryField from '../item_category_field/ItemCategoryField';
import AppButton from '../app_button/AppButton';
import {shadowStyleProps} from 'utils/utils';

export interface ItemCategoryProps extends TextProps {
  item: Category;
  categoryIndex: number;
}

type DropDown = {key: number; label: PropertyType | string};
const data: DropDown[] = [
  {key: 0, label: 'Text'},
  {key: 1, label: 'Checkbox'},
  {key: 2, label: 'Date'},
  {
    key: 3,
    label: 'Number',
  },
];

export default ({item, categoryIndex}: ItemCategoryProps) => {
  const {categories} = useAppSelector((state: RootState) => state.category);
  const dispatch = useAppDispatch();

  const propertiesData = useRef<DropDown[]>([]);

  useEffect(() => {
    propertiesData.current = [];

    item.properties?.map((item, index) => {
      propertiesData.current.push({key: index, label: item.propertyValue});
    });
  }, [item]);

  const renderItem = useCallback(
    ({item, index}: {item: CategoryProperty; index: number}) => {
      return (
        <ItemCategoryField
          item={item}
          index={index}
          categoryIndex={categoryIndex}
        />
      );
    },
    [],
  );

  return (
    <View style={styles.card} removeClippedSubviews={false}>
      <AppInputField
        label={item?.properties?.[0].propertyLabel ?? ''}
        value={item?.properties?.[0].propertyValue ?? ''}
        onChangeText={(text: string) => {
          dispatch(
            updatePropertyValue({
              categoryIndex: categoryIndex,
              propertyIndex: 0,
              value: text,
            }),
          );
        }}
        style={styles.marginTop}
      />

      <FlatList
        style={{flex: 1}}
        contentContainerStyle={{
          paddingHorizontal: SPACE.medium,
          paddingTop: SPACE.small,
        }}
        data={item.properties}
        renderItem={renderItem}
        removeClippedSubviews={false}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        // keyExtractor={item => item?.id}
      />

      <ModalSelector
        data={propertiesData.current}
        keyExtractor={item => item.key}
        labelExtractor={item => item?.label}
        onModalClose={option => {
          console.log(
            option,
            item.properties?.find(
              _item => _item.propertyValue === option?.label,
            ),
          );
          option.key >= 0 &&
            dispatch(
              updateTitleField({
                categoryIndex: categoryIndex,
                field: item.properties?.find(
                  _item => _item.propertyValue === option?.label,
                )!,
              }),
            );
        }}
        initValue={Strings.add_field}>
        <AppButton
          children={`${Strings.title_field} ${
            item.titleProperty?.propertyValue ?? Strings.unnamed_field
          }`}
          style={styles.marginTop}
        />
      </ModalSelector>

      <View style={styles.bottom}>
        <ModalSelector
          data={data}
          keyExtractor={item => item.key}
          labelExtractor={item => item?.label}
          onModalClose={option => {
            option.key >= 0 &&
              dispatch(
                addCategoryProperty({id: categoryIndex, type: option?.label}),
              );
          }}
          initValue={Strings.add_field}>
          <AppButton
            children={Strings.add_field}
            style={styles.button}
            theme={{colors: {primary: Colors.primary}}}
          />
        </ModalSelector>

        <Pressable
          style={styles.trash}
          onPress={() => dispatch(removeCategory(categoryIndex))}>
          <Trash fill={Colors.primary} />
          <AppLabel text={Strings.remove} style={styles.removeLabel} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: SPACE.borderRadius,
    borderColor: Colors.grey_normal,
    padding: SPACE.small,
    ...shadowStyleProps,
  },
  button: {
    backgroundColor: Colors.white,
    borderColor: Colors.grey2,
    borderWidth: 1,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: SPACE.borderRadius,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACE.small,
  },
  trash: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACE.small,
  },
  marginTop: {
    marginTop: SPACE.small,
  },
  removeLabel: {
    color: Colors.primary,
    paddingStart: SPACE.small,
    textTransform: 'uppercase',
  },
});
