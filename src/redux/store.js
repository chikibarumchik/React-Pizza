import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../redux/slices/filterSlice';
import sortReducer from '../redux/slices/sortSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    sort: sortReducer,
  },
});
