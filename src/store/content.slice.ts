import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { ContentEntity } from '../utils/sharedTypes';
import initialItems from '../mocks/initialItems';
import DataService from '../services/dataService';
import { generateImage } from './imageGeneration.slice';

interface ContentState {
  items: ContentEntity[]
  selectedTab: string;
}

const dataService = new DataService({ key: 'check_later_items', default: initialItems });

const initialState = {
  items: dataService.getAll(),
  selectedTab: 'watch',
} as ContentState;

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    switchTab: (state, action: PayloadAction<string>) => {
      state.selectedTab = action.payload;
    },
    addItem: (state, action: PayloadAction<ContentEntity>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(generateImage.fulfilled, (state, action) => {
      const { image, id } = action.payload;
      const itemToUpdate = state.items.find((i) => i.id === id);
      if (itemToUpdate) {
        itemToUpdate.image = image;
      }
    });
  },

});

export const { switchTab, addItem, removeItem } = contentSlice.actions;

export const contentItemsFiltered = createSelector([
  (state: RootState) => state.content.items,
  (state: RootState) => state.content.selectedTab,
  (state: RootState) => state.imageGeneration.statusById,
], (items, tab, statusById) => items.filter((item) => item.actionType === tab).map((item) => ({
  ...item,
  isImageGenerationInProgress: statusById[item.id] === 'pending',
})));

// Other code such as selectors can use the imported `RootState` type
export const selectedTab = (state: RootState) => state.content.selectedTab;

export default contentSlice.reducer;
