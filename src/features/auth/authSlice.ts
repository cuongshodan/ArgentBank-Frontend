import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store"; // Adjust the import path as necessary

interface AuthState {
  user: string | null;
  token: string | null;
  userName: string | null;
}

const user = localStorage.getItem('user') || sessionStorage.getItem('user');
const token = localStorage.getItem('token') || sessionStorage.getItem('token');

const initialState: AuthState = {
  user: user ? user : null,
  token: token ? token : null,
  userName: null,
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
      } else {
        sessionStorage.setItem('user', user);
        sessionStorage.setItem('token', accessToken);
      }
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.userName = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userName');
    },
    updateUserName: (
      state,
      action: PayloadAction<{ userName: string }>
    ) => {
      state.userName = action.payload.userName;
      if (localStorage.getItem('userName')) {
        localStorage.setItem('userName', action.payload.userName);
      }
    },
  },
});

export const { setCredentials, logOut, updateUserName } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState): string | null =>
  state.auth.userName || state.auth.user;
export const selectCurrentToken = (state: RootState): string | null =>
  state.auth.token;
