import { createSlice } from "@reduxjs/toolkit";
const counterSlice = createSlice({
  name: "counter",
  initialState: {
    data: 5,
  },
  reducers: {
    increment: (state, action) => void(state.data++),
  },
});

export const { increment } = counterSlice.actions;
export default counterSlice.reducer;
