import { gql } from "@apollo/client";

export const GET_AUTHED_USER = gql`
  query GetAuthedUser {
    getAuthedUser {
      id
      name
      email
      favorites {
        name
      }
    }
  }
`;
