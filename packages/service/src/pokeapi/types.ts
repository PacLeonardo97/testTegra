export interface IListPokemon {
  name: string;
  id: string;
  types: string[];
  img: string;
  url: string;
}

export interface IApiListPokemons {
  results: IListPokemon[];
}

export interface IPokemon {
  types: {
    type: {
      name: string;
    };
  }[];
}

export type IParams = {
  offset: number;
  limit: number;
};
