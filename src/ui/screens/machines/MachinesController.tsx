import React, {FC, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import AppLabel from 'ui/components/app_label/AppLabel';
import Strings from 'config/Strings';
import AppButton from 'ui/components/app_button/AppButton';
import {useNavigation, useRoute} from '@react-navigation/core';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from 'routes/DrawerStack';
import {FONTS, SPACE} from 'config/Dimension';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from 'hooks/redux';
import {RootState} from 'store/store';
import Colors from 'config/Colors';
import ItemMachine from 'ui/components/item_machine/ItemMachine';
import {addMachine, MachineCategory} from 'store/categorySlice';
import {isTablet} from 'react-native-device-info';

type DashboardNav = DrawerNavigationProp<DrawerParamList, 'Dashboard'>;

type prop = {};

export const MachinesController: FC<prop> = ({}) => {
  const navigation = useNavigation<DashboardNav>();
  const route = useRoute<any>();
  const dispatch = useAppDispatch();
  const category = useAppSelector(
    (state: RootState) => state.category,
  )?.categories?.find(
    item => item.categoryName === route?.params?.categoryType,
  );

  console.log('categores', route?.params);
  const renderItem = useCallback(
    ({item, index}: {item: MachineCategory[]; index: number}) => {
      return <ItemMachine item={item} machineIndex={index} />;
    },
    [],
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.scrollview}
        nestedScrollEnabled={true}>
        <FlatList
          data={category?.machines}
          renderItem={renderItem}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          numColumns={isTablet() ? 2 : 1}
          ItemSeparatorComponent={() => <View style={{height: SPACE.small}} />}
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
                    category && dispatch(addMachine(category));
                  }}
                />
              </View>

              {(category?.machines?.length ?? 0) <= 0 && (
                <View style={styles.noRecord}>
                  <AppLabel text={Strings.no_items} style={styles.label} />
                </View>
              )}
            </>
          )}
        />
      </ScrollView>
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
