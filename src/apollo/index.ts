import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-boost";
import { genres, selectRandom } from "../util";

const link = new HttpLink({ uri: "https://graphql.anilist.co" });

export const cache = new InMemoryCache();

export const client = new ApolloClient({
  link,
  cache,
  resolvers: {}
});

const data = {
  genres: selectRandom(genres, 5)
};

client.writeData({ data });
