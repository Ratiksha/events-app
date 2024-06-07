import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './reducers';

const makeStore = () => configureStore({
  reducer: rootReducer,
});

export const wrapper = createWrapper(makeStore);