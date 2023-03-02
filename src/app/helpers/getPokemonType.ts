import { Pokemon } from "../models";

/**
 *
 */
export const getPokemonType = (pokemon: Pokemon): string => {
  let types = pokemon.types[0].type.name;
  for (let i = 1; i < pokemon.types.length; i++) {
    types += ` | ${pokemon.types[i].type.name}`;
  }

  return types;
};
