import {useAppSelector} from 'hooks/redux';
import React, {FC} from 'react';
import {RootState} from 'store/store';
import CustomDrawer from 'ui/components/drawer/CustomDrawer';
import {CategoriesController} from 'ui/screens/categories/CategoriesController';
import {MachinesController} from 'ui/screens/machines/MachinesController';
import {ManageCategories} from 'ui/screens/manage/ManageCategoriesController';
import {DrawerParamList, DrawerStack} from './DrawerStack';

type Props = {
  initialRouteName?: keyof DrawerParamList;
};

export const DrawerRoutes: FC<Props> = ({initialRouteName}) => {
  const {navdrawer} = useAppSelector((state: RootState) => state.category);

  return (
    <DrawerStack.Navigator
      initialRouteName={initialRouteName}
      backBehavior="initialRoute"
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

      {navdrawer.map(category => (
        <DrawerStack.Screen
          name={category}
          component={MachinesController}
          initialParams={{categoryType: category}}
        />
      ))}

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
