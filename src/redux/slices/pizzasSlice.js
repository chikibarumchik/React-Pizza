import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async params => {
    const response = await axios.get(
      `https://67c1bcee61d8935867e418dc.mockapi.io/items?page=${params.page}&limit=3${params.category}` +
        params.sortBy +
        params.search,
    );

    return response.data;
  },
);

const initialState = {
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
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPizzas.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.isLoading = false;
        state.items = [];
      });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
