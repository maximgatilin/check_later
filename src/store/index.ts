import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './content.slice';
import imageGenerationReducer from './imageGeneration.slice';

export const store = configureStore({
  reducer: {
    content: contentReducer,
    imageGeneration: imageGenerationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
