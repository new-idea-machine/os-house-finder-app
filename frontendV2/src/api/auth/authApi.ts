import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Credentials, RegisterResponse, UserResponse } from '@constants/types';

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
      transformResponse: async (response: UserResponse) => {
        return response;
      },
    }),
    register: builder.mutation<RegisterResponse, Credentials>({
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
          id: baseQueryReturnValue.id,
          email: baseQueryReturnValue.email,
          role: baseQueryReturnValue.role,
          token: baseQueryReturnValue.token,
        };
      },
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue.data;
      },
    }),
    register: builder.mutation<RegisterResponse, Credentials>({
      query: (credentials) => ({
        url: '/api/users/register',
        method: 'POST',
        body: credentials,
      }),
      // transformResponse(baseQueryReturnValue) {
      //   return {
      //     token: baseQueryReturnValue.token,
      //   };
      // },
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue.data;
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
