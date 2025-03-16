import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const presentItem = state.items.find(
        item => item.id === action.payload.id,
      );

      if (presentItem) {
        presentItem.count += 1;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice += action.payload.price;
    },

    removeItem(state, action) {
      const presentItem = state.items.find(
        item => item.id === action.payload.id,
      );

      presentItem.count -= 1;
      state.totalPrice -= action.payload.price;
    },

    removeItemAll(state, action) {
      const presentItem = state.items.find(
        item => item.id === action.payload.id,
      );

      state.totalPrice -= presentItem.price * presentItem.count;
      presentItem.count = 0;
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, removeItemAll } =
  cartSlice.actions;
export default cartSlice.reducer;
