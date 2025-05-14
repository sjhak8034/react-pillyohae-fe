// store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductResponse } from "../api/products";
interface ProductState {
  product: ProductResponse | null;
}

const initialState: ProductState = {
  product: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<ProductResponse>) {
      state.product = action.payload;
    },
  },
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
