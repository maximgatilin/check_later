import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './content.slice';
import imageGenerationReducer from './imageGeneration.slice';
import listenerMiddleware from './listenerMiddleware';

export const store = configureStore({
  reducer: {
    content: contentReducer,
    imageGeneration: imageGenerationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
