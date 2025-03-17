import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../redux/slices/filterSlice';
import sortReducer from '../redux/slices/sortSlice';
import pageReducer from '../redux/slices/pageSlice';
import cartReducer from '../redux/slices/cartSlice';
import pizzasReducer from '../redux/slices/pizzasSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    sort: sortReducer,
    page: pageReducer,
    cart: cartReducer,
    pizzas: pizzasReducer,
  },
});
