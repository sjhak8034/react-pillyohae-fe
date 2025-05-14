import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../api/products";

interface CategoryState {
  category: Category[] | null;
}

const initialState: CategoryState = {
  category: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<Category[]>) {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
