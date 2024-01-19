import { createListenerMiddleware } from '@reduxjs/toolkit';

import DataService from '../services/dataService';

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware();

const dataService = new DataService({ key: 'check_later_items' });

// ts-ignore is used here because middleware.withTypes methods are not available for some reason.

listenerMiddleware.startListening({
  // @ts-ignore
  predicate: (_, current, previous) => current.content.items !== previous.content.items,
  effect: (_, listener) => {
    const state = listener.getState();
    // @ts-ignore
    dataService.setAll(state.content.items);
  },
});

export default listenerMiddleware;
