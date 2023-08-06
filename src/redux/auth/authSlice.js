import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: { userImage: null, login: null, email: null, userId: null },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserInfo(state, { payload: { userImage, login, email, userId } }) {
      state.user.userImage = userImage;
      state.user.login = login;
      state.user.email = email;
      state.user.userId = userId;
    },
    authSignOut() {
      return initialState;
    },
  },
});

export const { updateUserInfo, authSignOut, handleLoading } = authSlice.actions;
export const authReducer = authSlice.reducer;
