import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink, ApolloLink, concat } from "apollo-boost";
import { genres, selectRandom } from "../util";

const httpLink = new HttpLink({
  uri: "https://graphql.anilist.co"
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("kensoku_access");
  if (token) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return forward(operation);
});

export const cache = new InMemoryCache();

export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache,
  resolvers: {}
});

const data = {
  genres: selectRandom(genres, 8),
  featuredMedia: [] as number[]
};

client.writeData({ data });
