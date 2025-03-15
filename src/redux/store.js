import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../redux/slices/filterSlice';
import sortReducer from '../redux/slices/sortSlice';
import pageReducer from '../redux/slices/pageSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    sort: sortReducer,
    page: pageReducer,
  },
});
