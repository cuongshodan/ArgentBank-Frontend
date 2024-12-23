import { apiSlice } from "../../app/api/apiSlice";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  status: number;
  message: string;
  body: {
    token: string;
  };
}

interface ProfileResponse {
  status: number;
  message: string;
  body: {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
}

interface UpdateProfileRequest {
  userName: string;
}

interface UpdateProfileResponse {
  status: number;
  message: string;
  body: {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "user/login",
        method: "POST",
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: credentials,
      }),
    }),
    getProfile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: "user/profile",
        method: "GET",
        headers: {
          'accept': 'application/json',
        },
      }),
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation<UpdateProfileResponse, UpdateProfileRequest>({
      query: (data) => ({
        url: "user/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery, useUpdateProfileMutation } = authApiSlice;
