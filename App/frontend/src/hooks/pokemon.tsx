'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { myApi } from '@pokemon/service';
import type { IListPokemon } from '@pokemon/service';

export function usePokemon() {
  const searchParams = useSearchParams();
  const generation = Number(searchParams.get('generation')) || 1;
  const [listPokemon, setListPokemon] = useState([] as IListPokemon[]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(false);
        const req = await myApi.getAllPokemon(generation);
        setListPokemon(req as unknown as IListPokemon[]);
      } catch (error) {
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
    generation
  };
}
