import React, {useCallback, useEffect, useState} from 'react';
import {Text} from 'react-native-paper';
import {StyleSheet, View, FlatList, Pressable} from 'react-native';
import AppLabel from 'ui/components/app_label/AppLabel';
import Strings from 'config/Strings';
import AppButton from 'ui/components/app_button/AppButton';
import {useNavigation} from '@react-navigation/core';
import Screen from 'ui/components/screen/Screen';
import {SPACE} from 'config/Dimension';
import Colors from 'config/Colors';
import ItemCategoryField from 'ui/components/item_category_field/ItemCategoryField';
import AppInputField from 'ui/components/app_input/AppInputField';
import Trash from 'assets/images/trash.svg';
import {shadowStyleProps} from 'utils/utils';
import ModalSelector from 'react-native-modal-selector';
import {RootState} from 'store/store';
import {useAppDispatch, useAppSelector} from 'hooks/redux';
import {addCategory, Category, CategoryState} from 'store/categorySlice';
import ItemCategory from 'ui/components/item_category/ItemCategory';

export const ManageCategories = () => {
  const navigation = useNavigation();
  const {categories} = useAppSelector((state: RootState) => state.category);
  const dispatch = useAppDispatch();

  const renderItem = useCallback(
    ({item, index}: {item: Category; index: number}) => {
      return <ItemCategory item={item} categoryIndex={index} />;
    },
    [],
  );

  return (
    <Screen style={styles.container}>
      <View style={styles.container}>
        <FlatList
          style={{flex: 1}}
          contentContainerStyle={{
            paddingHorizontal: SPACE.medium,
            paddingTop: SPACE.small,
          }}
          data={categories}
          renderItem={renderItem}
          removeClippedSubviews={false}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          // keyExtractor={item => item?.id}
        />
      </View>

      <View style={styles.btnContainer}>
        <AppButton
          children={Strings.add_category}
          onPress={() => {
            dispatch(addCategory());
          }}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.grey1},
  button: {
    backgroundColor: Colors.white,
    borderColor: Colors.grey2,
    borderWidth: 1,
  },
  btnContainer: {
    paddingHorizontal: SPACE.medium,
  },
});
