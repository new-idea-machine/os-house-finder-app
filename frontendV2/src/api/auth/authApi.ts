import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Credentials, UserResponse } from '@constants/types';

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
  }),
});

export const { useLoginMutation } = authApi;
