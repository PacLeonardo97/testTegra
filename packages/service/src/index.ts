import { pokeApi as myApi, apiInstance } from './myApi';
import { EEventsSocket } from './myApi/socket';
import { pokeApi } from './pokeapi';
import type {
  IApiListPokemons,
  IPokemon,
  IParams,
  IListPokemon
} from './pokeapi/types';

export { pokeApi, myApi, EEventsSocket };

export type { IApiListPokemons, IPokemon, IParams, IListPokemon, apiInstance };
