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
      }),
      invalidatesTags: ['User'],
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
