import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';

export type CartItemType = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  type: string;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItemType[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
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

    removeItem(state, action: PayloadAction<CartItemType>) {
      const presentItem = state.items.find(
        item => item.id === action.payload.id,
      );

      if (presentItem) {
        presentItem.count -= 1;
        state.totalPrice -= action.payload.price;
      }
    },

    removeItemAll(state, action: PayloadAction<CartItemType>) {
      const presentItem = state.items.find(
        item => item.id === action.payload.id,
      );

      if (presentItem) {
        state.totalPrice -= presentItem.price * presentItem.count;
        presentItem.count = 0;
      }
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const cartState = (state: RootState) => state.cart;

export const { addItem, removeItem, clearItems, removeItemAll } =
  cartSlice.actions;
export default cartSlice.reducer;
