import React, {FC} from 'react';
import {CategoriesController} from 'ui/screens/categories/CategoriesController';
import {ManageCategories} from 'ui/screens/manage/ManageCategoriesController';
import {DrawerParamList, DrawerStack} from './DrawerStack';

type Props = {
  initialRouteName?: keyof DrawerParamList;
};

export const DrawerRoutes: FC<Props> = ({initialRouteName}) => {
  return (
    <DrawerStack.Navigator
      initialRouteName={initialRouteName}
      useLegacyImplementation={false}
      screenOptions={
        {
          // headerTitleAlign: 'center',
        }
      }>
      <DrawerStack.Screen
        name="Dashboard"
        component={CategoriesController}
        options={{
          headerShown: true,
        }}
      />

      <DrawerStack.Screen
        name="ManageCategories"
        component={ManageCategories}
        options={{
          headerShown: true,
        }}
      />
    </DrawerStack.Navigator>
  );
};
