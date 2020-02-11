import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

interface Props {
  children: React.ReactNode;
}

const client = new ApolloClient({
  uri: "https://graphql.anilist.co"
});

export default (props: Props) => (
  <ApolloProvider client={client}>{props.children}</ApolloProvider>
);
