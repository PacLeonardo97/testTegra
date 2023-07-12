import axios from "axios";
import type { IApiListPokemons } from '../pokeapi/types';

const apiInstance = axios.create({
    baseURL: "http://localhost:3333/api/",
});

class ApiPokemon {
    async getAllPokemon(generation?: number) {
        const req = await apiInstance.get<IApiListPokemons>("listPokemon", {
            params: {
                generation
            }
        });

        return req.data;
    }
    async login(data: {email:string, password: string}) {
        const req = await apiInstance.post("login", data);
        return req.data
    }
}

const pokeApi = new ApiPokemon()

export {
    pokeApi,
    apiInstance,
};