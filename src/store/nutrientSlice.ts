import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Nutrient } from "../api/products";

interface NutrientState {
  nutrient: Nutrient[] | null;
}

const initialState: NutrientState = {
  nutrient: null,
};

const nutrientSlice = createSlice({
  name: "nutrient",
  initialState,
  reducers: {
    setNutrient(state, action: PayloadAction<Nutrient[]>) {
      state.nutrient = action.payload;
    },
  },
});

export const { setNutrient } = nutrientSlice.actions;
export default nutrientSlice.reducer;
