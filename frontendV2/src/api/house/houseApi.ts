import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
});

type HouseId = string;

console.log(
  import.meta.env.VITE_BASE_URL + 'api/houses/6535f02e3cf2f28c9fb6a168'
);

export const houseApi = createApi({
  baseQuery,
  reducerPath: 'houseApi',
  tagTypes: ['House'],
  endpoints: (builder) => ({
    getHouseById: builder.query<Object, HouseId>({
      //   query: (houseId) => {
      //     // Construct the URL using the houseId parameter
      //     const url = `/api/houses/${houseId}`;
      //     // Return an object with the URL and the HTTP method
      //     return {
      //       url,
      //       method: 'GET',
      //       withCredentials: true,
      //       credentials: 'include',
      //     };
      //   },

      query: (houseId) => {
        return {
          url: `/api/houses/${houseId}`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          credentials: 'include',
        };
      },
      transformResponse: async (response: any) => {
        console.log('House Api Respponse: ', response);
        return response.data;
      },
    }),
  }),
});

export const { useGetHouseByIdQuery } = houseApi;
