import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {DrawerItemList} from '@react-navigation/drawer';
import AppLabel from '../app_label/AppLabel';

const CustomDrawer = props => {
  const {state, navigation} = props;

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        {state.routes.map((route: any, index: number) => {
          return (
            <View>
              <AppLabel
                text={route?.name}
                key={route.key}
                onPress={() => navigation.navigate('ManageCategories')}
              />
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomDrawer;
