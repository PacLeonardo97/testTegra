import axios from 'axios';

import type {
  IApiListPokemons,
  IPokemon,
  IParams,
  IListPokemon
} from './types';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
});

class ApiPokemon {
  async params(generation: string) {
    return {
      1: { limit: 151 },
      2: { offset: 151, limit: 100 },
      3: { offset: 251, limit: 135 },
      4: { offset: 386, limit: 107 },
      5: { offset: 493, limit: 156 },
      6: { offset: 649, limit: 72 },
      7: { offset: 721, limit: 88 },
      8: { offset: 809, limit: 96 },
      9: { offset: 905, limit: 105 }
    }[generation] as IParams;
  }

  async getAllPokemon(params: IParams) {
    const req = await api.get<IApiListPokemons>('pokemon', { params });
    const result = req.data.results.map(async ({ name, url }) => {
      const id = `${url
        .replace('https://pokeapi.co/api/v2/pokemon/', '')
        .replace(/\D/g, '')}`;
      const req = await api.get<IPokemon>(url);
      return {
        name,
        id,
        url,
        types: req.data.types.map(v => v.type.name),
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      };
    });
    return Promise.all(result);
  }
}

const pokeApi = new ApiPokemon();

export { pokeApi };

export type { IApiListPokemons, IPokemon, IParams, IListPokemon };
