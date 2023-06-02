import {createDrawerNavigator} from '@react-navigation/drawer';

export type DrawerParamList = {
  Dashboard: undefined;
  ManageCategories: undefined;
};

export const DrawerStack = createDrawerNavigator<DrawerParamList>();
