import React, {useEffect} from 'react';
import {Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import AppLabel from 'ui/components/app_label/AppLabel';
import Strings from 'config/Strings';
import AppButton from 'ui/components/app_button/AppButton';
import {useNavigation} from '@react-navigation/core';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from 'routes/DrawerStack';
import {SPACE} from 'config/Dimension';

type DashboardNav = DrawerNavigationProp<DrawerParamList, 'Dashboard'>;

export const CategoriesController = () => {
  const navigation = useNavigation<DashboardNav>();

  return (
    <View style={styles.container}>
      <AppLabel text={Strings.no_categories} style={styles.label} />
      <AppButton
        children={Strings.add_category}
        style={styles.button}
        onPress={() => {
          navigation?.navigate('ManageCategories');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  label: {paddingBottom: 10},
  button: {
    borderRadius: SPACE.borderRadius,
  },
});
