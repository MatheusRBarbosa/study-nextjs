import { Pokemon } from "@/app/models";
import { FetchResult } from "./fetchResult";

export class PokeApiService {
  baseUrl = "https://pokeapi.co/api/v2/pokemon";

  /**
   *
   */
  fetchData = async (page: number = 1): Promise<FetchResult> => {
    const limit = 50;
    const offset = (page - 1) * limit;

    const result = await fetch(
      `${this.baseUrl}?limit=${limit}&offset=${offset}`
    );

    return await result.json();
  };

  /**
   *
   */
  fetchPokemon = async (url: string): Promise<Pokemon> => {
    const data = await fetch(url);
    return await data.json();
  };

  /**
   *
   */
  fetchByName = async (name: string): Promise<Pokemon> => {
    const data = await fetch(`${this.baseUrl}/${name}`);
    return await data.json();
  };
}
