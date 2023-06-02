import {
  ActionCreatorWithPayload,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import AsyncStorage from './local/AsyncStorage';

export type PropertyType = 'Checkbox' | 'Date' | 'Number' | 'Text';

export interface CategoryProperty {
  propertyValue: string;
  propertyType: PropertyType;
  propertyLabel?: string;
}

export interface MachineCategory {
  propertyValue: string;
  propertyType?: PropertyType;
  propertyLabel?: string;
  categoryName: string;
}

export interface Category {
  categoryId?: number;
  categoryName: string;
  properties?: CategoryProperty[];
  titleProperty?: CategoryProperty;
  machines: MachineCategory[][];
}

const defaultCategory: Category = {
  categoryName: '',
  properties: [
    {propertyValue: '', propertyType: 'Text', propertyLabel: 'Category Name'},
  ],
  machines: [],
};

export interface CategoryState {
  categories: Category[];
  navdrawer: string[];
}

const initialState: CategoryState = {
  categories: [],
  navdrawer: [],
};

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: state => {
      let newCategroy = {...defaultCategory};
      newCategroy.categoryId = state.categories?.length;
      state.categories.push(newCategroy);
      state.categories = [...state.categories];

      AsyncStorage.storeCategories(state.categories);
    },
    addCategoryProperty: (
      state,
      {payload}: PayloadAction<{id: number; type: PropertyType}>,
    ) => {
      let findCategory = state.categories[payload?.id];
      findCategory.properties?.push({
        propertyValue: '',
        propertyType: payload?.type,
      });
      state.categories.splice(payload?.id, 1, findCategory);
      state.categories = [...state.categories];

      let navItem: string[] = [];
      state.categories.map(item => {
        item?.categoryName && navItem.push(item?.categoryName);
      });
      state.navdrawer = navItem;

      AsyncStorage.storeCategories(state.categories);
    },
    removeCategory: (state, {payload}: PayloadAction<number>) => {
      state.categories?.splice(payload, 1);
      state.categories = [...state.categories];

      let navItem: string[] = [];
      state.categories.map(item => {
        item?.categoryName && navItem.push(item?.categoryName);
      });
      state.navdrawer = navItem;

      AsyncStorage.storeCategories(state.categories);
    },
    removeCategoryProperty: (
      state,
      {payload}: PayloadAction<{categoryIndex: number; propertyIndex: number}>,
    ) => {
      let findCategory = state.categories[payload?.categoryIndex];
      findCategory?.properties?.splice(payload.propertyIndex, 1);

      state.categories.splice(payload?.categoryIndex, 1, findCategory);
      state.categories = [...state.categories];

      let navItem: string[] = [];
      state.categories.map(item => {
        item?.categoryName && navItem.push(item?.categoryName);
      });
      state.navdrawer = navItem;

      AsyncStorage.storeCategories(state.categories);
    },
    updatePropertyValue: (
      state,
      {
        payload,
      }: PayloadAction<{
        categoryIndex: number;
        propertyIndex: number;
        value: string;
      }>,
    ) => {
      let findCategory = state.categories[payload?.categoryIndex];
      findCategory!.properties![payload?.propertyIndex].propertyValue =
        payload.value;

      state.categories.splice(payload?.categoryIndex, 1, findCategory);
      state.categories = [...state.categories];

      let navItem: string[] = [];
      state.categories.map(item => {
        item?.categoryName && navItem.push(item?.categoryName);
      });
      state.navdrawer = navItem;

      AsyncStorage.storeCategories(state.categories);
    },
    updateTitleField: (
      state,
      {
        payload,
      }: PayloadAction<{categoryIndex: number; field: CategoryProperty}>,
    ) => {
      let findCategory = state.categories[payload?.categoryIndex];
      findCategory.titleProperty = payload.field;

      state.categories.splice(payload?.categoryIndex, 1, findCategory);
      state.categories = [...state.categories];

      let navItem: string[] = [];
      state.categories.map(item => {
        item?.categoryName && navItem.push(item?.categoryName);
      });
      state.navdrawer = navItem;

      AsyncStorage.storeCategories(state.categories);
    },
    updateCategory: (
      state,
      {
        payload,
      }: PayloadAction<{
        categoryIndex: number;
        value: string;
      }>,
    ) => {
      let findCategory = state.categories[payload?.categoryIndex];
      findCategory.categoryName = payload?.value;
      state.categories = [...state.categories];

      let navItem: string[] = [];
      state.categories.map(item => {
        item?.categoryName && navItem.push(item?.categoryName);
      });
      state.navdrawer = navItem;

      AsyncStorage.storeCategories(state.categories);
    },
    addMachine: (state, {payload}: PayloadAction<Category>) => {
      let findCategory = state.categories.find(
        category => category.categoryName === payload.categoryName,
      );

      let findCategoryIndex = state.categories.findIndex(
        category => category.categoryName === payload.categoryName,
      );

      let defaultMachine: MachineCategory = {
        propertyValue: '',
        propertyLabel: '',
        categoryName: '',
      };

      let machineProperties: MachineCategory[] = [];

      findCategory?.properties?.forEach((element, index) => {
        machineProperties.push({...defaultMachine});

        machineProperties[index].propertyLabel = element.propertyValue;
        machineProperties[index].propertyType = element.propertyType;
        machineProperties[index].propertyValue = '';
        machineProperties[index].categoryName = payload.categoryName;
      });

      findCategory?.machines.push(machineProperties);

      state.categories.splice(findCategoryIndex, 1, findCategory!);
      state.categories = [...state.categories];

      AsyncStorage.storeCategories(state.categories);
    },
    updateMachineValues: (
      state,
      {
        payload,
      }: PayloadAction<{
        machineCategoryIndex: number;
        machineIndex: number;
        machineType: string;
        propertyValue: string;
      }>,
    ) => {
      let findCategory: Category | undefined = state.categories.find(
        category => category.categoryName === payload?.machineType,
      );
      let findCategoryIndex: number | undefined = state.categories.findIndex(
        category => category.categoryName === payload?.machineType,
      );

      let findMachine: MachineCategory[] | undefined =
        findCategory?.machines?.[payload.machineIndex];
      let findMachineCategory: MachineCategory | undefined =
        findMachine?.[payload?.machineCategoryIndex];
      findMachineCategory!.propertyValue = payload?.propertyValue;

      findMachine?.splice(
        payload.machineCategoryIndex,
        1,
        findMachineCategory!,
      );
      findCategory?.machines.splice(payload.machineIndex, 1, findMachine!);
      state.categories.splice(findCategoryIndex, 1, findCategory!);

      state.categories = [...state.categories];

      AsyncStorage.storeCategories(state.categories);
    },
    removeMachine: (
      state,
      {
        payload,
      }: PayloadAction<{
        machineIndex: number;
        machineType: string;
      }>,
    ) => {
      let findCategory: Category | undefined = state.categories.find(
        category => category.categoryName === payload?.machineType,
      );
      let findCategoryIndex: number | undefined = state.categories.findIndex(
        category => category.categoryName === payload?.machineType,
      );

      findCategory?.machines.splice(payload?.machineIndex, 1);
      state.categories.splice(findCategoryIndex, 1, findCategory!);

      state.categories = [...state.categories];

      AsyncStorage.storeCategories(state.categories);
    },
    addDataFromStore: (state, {payload}: PayloadAction<Category[]>) => {
      state.categories = payload;

      let navItem: string[] = [];
      state.categories.map(item => {
        item?.categoryName && navItem.push(item?.categoryName);
      });
      state.navdrawer = navItem;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addCategory,
  addCategoryProperty,
  removeCategory,
  removeCategoryProperty,
  updateTitleField,
  updatePropertyValue,
  updateCategory,
  addMachine,
  updateMachineValues,
  removeMachine,
  addDataFromStore,
} = categorySlice.actions;

export default categorySlice.reducer;
