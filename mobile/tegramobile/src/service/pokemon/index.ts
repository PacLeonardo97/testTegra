import type {IApiListPokemons, IPokemon, IParams} from '../../types/pokemon';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

class ApiPokemon {
  async getAllPokemon(params: IParams) {
    const req = await api.get<IApiListPokemons>('pokemon', {params});
    const result = req.data.results.map(async ({name, url}) => {
      const id = `${url
        .replace('https://pokeapi.co/api/v2/pokemon/', '')
        .replace(/\D/g, '')}`;
      const req = await api.get<IPokemon>(url);
      return {
        name,
        id,
        types: req.data.types.map(v => v.type.name),
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      };
    });
    return Promise.all(result);
  }
}

export default new ApiPokemon();
