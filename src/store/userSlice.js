import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "Hello there",
  user: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = 'Login Success';
      state.user = action.payload
    },
    logout: (state) => {
      state.value = 'Logout Success';
      state.user = [];
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {login, logout, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;
