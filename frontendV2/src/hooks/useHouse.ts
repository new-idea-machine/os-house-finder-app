import * as React from 'react';
import { useGetHouseByIdQuery } from '@api/house/houseApi.ts';

export default function useHouse() {
  // Using a query hook automatically fetches data and returns query values
  const {
    data: houseData,
    error,
    isLoading,
    //   } = useGetHouseByIdQuery();
  } = useGetHouseByIdQuery('6535f02e3cf2f28c9fb6a168');
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  // render UI based on data and loading state
  return {
    houseData,
    error,
    isLoading,
  };
}
