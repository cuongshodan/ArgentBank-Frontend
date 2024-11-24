import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store"; // Adjust the import path as necessary

interface AuthState {
  user: string | null;
  token: string | null;
}

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');

const initialState: AuthState = {
  user: user ? user : null,
  token: token ? token : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: string; accessToken: string; rememberMe?: boolean }>
    ) => {
      const { user, accessToken, rememberMe } = action.payload;
      state.user = user;
      state.token = accessToken;

      if (rememberMe) {
        localStorage.setItem('user', user);
        localStorage.setItem('token', accessToken);
      }
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState): string | null =>
  state.auth.user;
export const selectCurrentToken = (state: RootState): string | null =>
  state.auth.token;
