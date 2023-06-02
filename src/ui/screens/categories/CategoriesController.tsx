import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import AppLabel from 'ui/components/app_label/AppLabel';
import Strings from 'config/Strings';
import AppButton from 'ui/components/app_button/AppButton';
import {useNavigation} from '@react-navigation/core';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from 'routes/DrawerStack';
import {FONTS, SPACE} from 'config/Dimension';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from 'hooks/redux';
import {RootState} from 'store/store';
import Colors from 'config/Colors';
import ItemMachine from 'ui/components/item_machine/ItemMachine';
import {addMachine, MachineCategory} from 'store/categorySlice';

type DashboardNav = DrawerNavigationProp<DrawerParamList, 'Dashboard'>;

export const CategoriesController = () => {
  const navigation = useNavigation<DashboardNav>();
  const dispatch = useAppDispatch();
  const {categories} = useAppSelector((state: RootState) => state.category);

  // console.log('categories', JSON.stringify(categories));
  const renderItem = useCallback(
    ({item, index}: {item: MachineCategory[]; index: number}) => {
      return <ItemMachine item={item} machineIndex={index} />;
    },
    [],
  );

  return (
    <View style={styles.container}>
      {categories?.length <= 0 ? (
        <View style={styles.noCategories}>
          <AppLabel text={Strings.no_categories_found} style={styles.label} />
          <AppButton
            children={Strings.add_category}
            style={styles.button}
            onPress={() => {
              navigation?.navigate('ManageCategories');
            }}
          />
        </View>
      ) : (
        <ScrollView
          style={styles.scrollview}
          contentContainerStyle={styles.scrollview}
          nestedScrollEnabled={true}>
          {categories?.map(category => {
            return (
              <FlatList
                data={category?.machines}
                renderItem={renderItem}
                style={styles.list}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => (
                  <View style={{height: SPACE.small}} />
                )}
                ListHeaderComponent={() => (
                  <>
                    <View style={styles.header}>
                      <AppLabel
                        text={category?.categoryName}
                        style={{fontWeight: '500', fontSize: FONTS.large}}
                      />
                      <AppButton
                        children={Strings.add_item}
                        onPressOut={() => {
                          dispatch(addMachine(category));
                        }}
                      />
                    </View>

                    {category?.machines?.length <= 0 && (
                      <View style={styles.noRecord}>
                        <AppLabel
                          text={Strings.no_items}
                          style={styles.label}
                        />
                      </View>
                    )}
                  </>
                )}
              />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  label: {paddingBottom: 10},
  button: {
    borderRadius: SPACE.borderRadius,
  },
  noCategories: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  scrollview: {},
  scrollviewContent: {flexGrow: 1},
  header: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: SPACE.small,
    marginBottom: SPACE.small,
    borderBottomWidth: 0.5,
    borderColor: Colors.grey2,
  },
  list: {},
  listContent: {
    paddingHorizontal: SPACE.medium,
    paddingTop: SPACE.small,
    flexGrow: 1,
  },
  noRecord: {alignItems: 'center', paddingVertical: SPACE.medium},
});
