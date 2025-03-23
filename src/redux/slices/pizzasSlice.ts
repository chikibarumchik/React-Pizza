import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'src/redux/store';

export type PizzaItem = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  type: string;
  types: number[];
  sizes: number[];
  size: number;
};

export type PizzasResponseParam = {
  sortBy: string;
  category: string;
  search: string;
  page: number;
};

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async (params: PizzasResponseParam) => {
    const response = await axios.get<PizzaItem[]>(
      `https://67c1bcee61d8935867e418dc.mockapi.io/items?page=${params.page}&limit=3${params.category}` +
        params.sortBy +
        params.search,
    );

    return response.data;
  },
);

interface PizzaSliceState {
  items: PizzaItem[];
  isLoading: boolean;
}

const initialState: PizzaSliceState = {
  items: [],
  isLoading: false,
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        fetchPizzas.fulfilled,
        (state, action: PayloadAction<PizzaItem[]>) => {
          state.items = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(fetchPizzas.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchPizzas.rejected, state => {
        state.isLoading = false;
        state.items = [];
      });
  },
});

export const pizzaState = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
