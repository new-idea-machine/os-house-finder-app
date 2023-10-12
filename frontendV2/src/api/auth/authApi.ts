import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Credentials, UserResponse, User } from '@constants/types';

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
      }),
      invalidatesTags: ['User'],
      transformResponse: async (response: UserResponse, meta) => {
        const token = await meta?.response?.headers.get('authorization');

        console.log('response', response);
        console.log('meta', meta);
        console.log('token', token);

        return response;
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
