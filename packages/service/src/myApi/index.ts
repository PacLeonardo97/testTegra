import axios from "axios";
import type { IApiListPokemons } from '../pokeapi/types';

const api = axios.create({
    baseURL: "http://localhost:3333/api/",
});

class ApiPokemon {
    async getAllPokemon(generation?: number) {
        const req = await api.get<IApiListPokemons>("listPokemon", {
            params: {
                generation
            }
        });

        return req.data;
    }
}

const pokeApi = new ApiPokemon()

export {
    pokeApi
};