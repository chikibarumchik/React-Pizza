import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';

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

export const pageState = (state: RootState) => state.page;

export const { setPageCount } = pageSlice.actions;

export default pageSlice.reducer;
