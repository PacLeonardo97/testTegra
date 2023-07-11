import type { IApiListPokemons, IPokemon, IParams, IListPokemon } from "./pokeapi/types";
import { pokeApi } from './pokeapi'
import { pokeApi as myApi, apiInstance } from './myApi';

export { 
  pokeApi,
  myApi
}

export type {
  IApiListPokemons,
  IPokemon,
  IParams,
  IListPokemon,
  apiInstance,
}