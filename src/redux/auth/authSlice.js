import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: { userImage: null, login: null, email: null, password: null },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser(state, { payload: { userImage, login, email, password } }) {
      state.user.userImage = userImage;
      state.user.login = login;
      state.user.email = email;
      state.user.password = password;
    },
  },
});

export const { registerUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
