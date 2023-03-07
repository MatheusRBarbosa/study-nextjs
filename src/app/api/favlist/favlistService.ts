import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ADD_FAVORITE, LOGIN, REMOVE_FAVORITE } from "./mutations";
import { GET_AUTHED_USER } from "./queries";

export class FavlistService {
  protected apolloClient?: ApolloClient<any>;

  protected get client() {
    if (!this.apolloClient) {
      this.configureClient();
    }

    return this.apolloClient!;
  }

  /**
   *
   */
  mutateLogin = async (variables: any) => {
    const response = await this.client.mutate({ mutation: LOGIN, variables });
    localStorage.setItem("token", response.data.login);
    window.location.replace("home");
  };

  /**
   *
   */
  queryAuthedUser = async () => {
    return await this.client.query({ query: GET_AUTHED_USER });
  };

  /**
   *
   */
  mutateAddFavorite = async (variables: any) => {
    return await this.client.mutate({ mutation: ADD_FAVORITE, variables });
  };

  /**
   *
   */
  mutateRemoveFavorite = async (variables: any) => {
    return await this.client.mutate({ mutation: REMOVE_FAVORITE, variables });
  };

  /**
   *
   */
  private configureClient = () => {
    const httpLink = createHttpLink({
      uri: "http://localhost:4000/",
    });

    const authLink = setContext((_, { headers }) => {
      const token = localStorage.getItem("token");

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });

    this.apolloClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  };
}
