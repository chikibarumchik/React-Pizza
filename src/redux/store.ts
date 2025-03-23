import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import sortReducer from './slices/sortSlice';
import pageReducer from './slices/pageSlice';
import cartReducer from './slices/cartSlice';
import pizzasReducer from './slices/pizzasSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    sort: sortReducer,
    page: pageReducer,
    cart: cartReducer,
    pizzas: pizzasReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
