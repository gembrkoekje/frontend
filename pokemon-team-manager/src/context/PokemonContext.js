import { createContext, useContext } from 'react';

export const PokemonContext = createContext(null);

export function usePokemonData() {
  return useContext(PokemonContext);
}
