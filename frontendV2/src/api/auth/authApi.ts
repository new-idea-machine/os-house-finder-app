import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Credentials,
  RegisterResponse,
  LoginResponse,
  UserResponse,
  User,
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
    register: builder.mutation<User, Credentials>({
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
        console.log('baseQueryReturnValue: ', baseQueryReturnValue);

        return {
          id: baseQueryReturnValue.data._id,
          email: baseQueryReturnValue.data.email,
          role: baseQueryReturnValue.data.role,
        };
      },
      transformErrorResponse(baseQueryReturnValue) {
        console.log('baseQueryReturnValue: ', baseQueryReturnValue);

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
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;
