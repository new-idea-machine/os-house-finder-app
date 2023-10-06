import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Credentials, User } from '@constants/types';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
});

export const authApi = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation<User, Credentials>({
      query: (credentials) => ({
        url: '/api/users/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/api/users/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
