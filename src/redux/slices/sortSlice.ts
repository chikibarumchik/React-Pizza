import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';

export type SortType = {
  name: string;
  type: 'rating' | 'price' | 'title';
};

interface SortSliceState {
  isVisible: boolean;
  sortType: SortType;
}

const initialState: SortSliceState = {
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
    selectSort(state, action: PayloadAction<SortType>) {
      state.isVisible = false;
      state.sortType = action.payload;
    },

    setVisible(state, action: PayloadAction<boolean>) {
      state.isVisible = action.payload;
    },
  },
});

export const sortState = (state: RootState) => state.sort;

export const { selectSort, setVisible } = sortSlice.actions;

export default sortSlice.reducer;
