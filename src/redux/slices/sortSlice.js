import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
  sortType: {
    name: 'популярности',
    type: 'rating',
  },
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    selectSort(state, action) {
      state.isVisible = false;
      state.sortType = action.payload;
    },

    setVisible(state, action) {
      state.isVisible = action.payload;
    },
  },
});

export const { selectSort, setVisible } = sortSlice.actions;

export default sortSlice.reducer;
