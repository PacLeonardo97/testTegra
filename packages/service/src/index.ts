import type { IApiListPokemons, IPokemon, IParams, IListPokemon } from "./pokeapi/types";
import { pokeApi } from './pokeapi'
import { pokeApi as myApi, apiInstance } from './myApi';
import { EEventsSocket } from './myApi/socket'

export { 
  pokeApi,
  myApi,
  EEventsSocket
}

export type {
  IApiListPokemons,
  IPokemon,
  IParams,
  IListPokemon,
  apiInstance
}