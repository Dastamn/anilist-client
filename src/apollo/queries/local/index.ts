import { gql } from "apollo-boost";

export const GET_GENRES = gql`
  query {
    genres @client
  }
`;

export const GET_FEATURED_MEDIA = gql`
  query {
    featuredMedia @client
  }
`;
