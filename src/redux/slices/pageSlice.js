import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pageCount: 1,
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
  },
});

export const { setPageCount } = pageSlice.actions;

export default pageSlice.reducer;
