import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Credentials,
  RegisterResponse,
  LoginResponse,
  UserResponse,
} from '@constants/types';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
});

export const authApi = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, Credentials>({
      query: (credentials) => ({
        url: '/api/users/login',
        method: 'POST',
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
      transformResponse: async (response: LoginResponse) => {
        return response.data;
      },
    }),
    register: builder.mutation<UserResponse, Credentials>({
      query: (credentials) => ({
        url: '/api/users/register',
        method: 'POST',
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
      }),
      transformResponse(baseQueryReturnValue: RegisterResponse) {
        return {
          _id: baseQueryReturnValue.data._id,
          email: baseQueryReturnValue.data.email,
          role: baseQueryReturnValue.data.role,
        };
      },
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue.data;
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/api/users/logout',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),
    googleLogin: builder.query<UserResponse, string>({
      query: (credential) => {
        const url = `/api/oauth/gsi?code=${credential}`;

        return {
          url,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          credentials: 'include',
        };
      },
      transformResponse: async (response: LoginResponse) => {
        return response.data;
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useLazyGoogleLoginQuery,
} = authApi;
