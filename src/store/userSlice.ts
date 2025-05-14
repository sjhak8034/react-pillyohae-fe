// store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UserProfileResponseDto } from "../api/users";
interface UserState {
  user: UserProfileResponseDto | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserProfileResponseDto>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
