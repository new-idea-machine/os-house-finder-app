import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';


// import { BASE_URL } from '../constants';

const baseQuery=fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL as string
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: () =>
    // builder
    ({}),
});
