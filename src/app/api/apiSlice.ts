import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";
import { RootState } from "../store";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001/api/v1/",
  prepareHeaders: (headers, { getState }) => {
    headers.set('accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    const state = getState() as RootState;
    let token = state.auth.token;

    if (!token) {
      token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    interface RefreshResult {
      accessToken: string;
    }

    const refreshResult = (await baseQuery("/refresh", api, extraOptions)) as {
      data: RefreshResult;
    };

    console.log(refreshResult);

    if (refreshResult?.data) {
      const state = api.getState() as RootState;
      const user = state.auth.user;
      // store the new token
      if (user) {
        // store the new token
        api.dispatch(
          setCredentials({
            user,
            accessToken: refreshResult.data.accessToken,
          })
        );
        // retry the original query with new access token
        result = await baseQuery(args, api, extraOptions);
      }
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Profile'],
  endpoints: (builder) => ({}),
});
