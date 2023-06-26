import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedInUser: "",
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  loginReducer: {
    login: (state, payload) => {
      state.loggedInUser = payload;
    },
  },
});

export const actions = loginSlice.actions;
export default loginSlice.reducer;
