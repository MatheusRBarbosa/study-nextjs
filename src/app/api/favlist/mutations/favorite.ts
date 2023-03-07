import { gql } from "@apollo/client";

export const ADD_FAVORITE = gql`
  mutation AddFavorite($pokemonName: String!) {
    addFavorite(pokemonName: $pokemonName)
  }
`;

export const REMOVE_FAVORITE = gql`
  mutation RemoveFavorite($pokemonName: String!) {
    removeFavorite(pokemonName: $pokemonName)
  }
`;
