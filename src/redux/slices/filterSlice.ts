import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';

const initialState = {
  categoryId: 0,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
  },
});

export const filterState = (state: RootState) => state.filter;

export const { setCategoryId } = filterSlice.actions;

export default filterSlice.reducer;
