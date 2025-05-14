import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./userSlice";
import nutreintSlice from "./nutrientSlice";
import categorySlice from "./categorySlice";

// stock 데이터 타입 정의
interface StockItem {
  id: number;
  name: string;
  count: number;
  price: number;
}

// stock slice 정의
const stock = createSlice({
  name: "stock",
  initialState: [
    { id: 0, name: "White and Black", count: 2, price: 120000 },
    { id: 1, name: "Red Knit", count: 1, price: 110000 },
    { id: 2, name: "Grey Yordan", count: 1, price: 130000 },
  ] as StockItem[],
  reducers: {
    changeName(state) {
      return state; // 동작 없음
    },
  },
});

// 스토어 설정 및 타입 지정
const store = configureStore({
  reducer: {
    stock: stock.reducer,
    user: user,
    nutrient: nutreintSlice,
    category: categorySlice,
  },
});

// store/store.ts

// RootState, AppDispatch 타입 export (사용 시 유용)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
