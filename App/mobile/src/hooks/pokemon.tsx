import { useEffect, useState } from 'react';

import { getStorage, setStorage } from '../helper/storage';
import apiPokemon from '../service/pokemon';
import type { IParams, IListPokemon, IStoragePokemon } from '../types/pokemon';

export function usePokemon() {
  const [generation, setGeneration] = useState(1);
  const [listPokemon, setListPokemon] = useState([] as IListPokemon[]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const params = {
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
        const storagePokemon = await getStorage<IStoragePokemon>('pokemon');
        if (storagePokemon?.generation !== generation) {
          setIsLoading(true);
        } else {
          setListPokemon(storagePokemon.list);
          return;
        }
        setError(false);
        const req = await apiPokemon.getAllPokemon(params);
        await setStorage('pokemon', JSON.stringify({ generation, list: req }));
        setListPokemon(req as IListPokemon[]);
      } catch (_) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [generation]);

  return {
    listPokemon,
    isLoading,
    error,
    generation,
    setGeneration
  };
}
