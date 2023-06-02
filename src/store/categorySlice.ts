import {
  ActionCreatorWithPayload,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

export type PropertyType = 'Checkbox' | 'Date' | 'Number' | 'Text';

export interface CategoryProperty {
  propertyValue: string;
  propertyType: PropertyType;
  propertyLabel?: string;
}

export interface Category {
  categoryId?: number;
  categoryName: string;
  properties?: CategoryProperty[];
  titleProperty?: CategoryProperty;
}

const defaultCategory: Category = {
  categoryName: 'New Categroy',
  properties: [
    {propertyValue: '', propertyType: 'Text', propertyLabel: 'Category Name'},
  ],
};

export interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
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
    },
    removeCategory: (state, {payload}: PayloadAction<number>) => {
      state.categories?.splice(payload, 1);
      state.categories = [...state.categories];
    },
    removeCategoryProperty: (
      state,
      {payload}: PayloadAction<{categoryIndex: number; propertyIndex: number}>,
    ) => {
      let findCategory = state.categories[payload?.categoryIndex];
      findCategory?.properties?.splice(payload.propertyIndex, 1);

      state.categories.splice(payload?.categoryIndex, 1, findCategory);
      state.categories = [...state.categories];
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
} = categorySlice.actions;

export default categorySlice.reducer;
