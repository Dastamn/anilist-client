import { gql } from "apollo-boost";

export const GET_FEATURED_ANIME = gql`
  query {
    featured @client {
      anime
    }
  }
`;

export const GET_FEATURED_ANIME_BY_ID = gql`
  query($id: Int) {
    featured @client {
      anime(containsId: $id)
    }
  }
`;

export const GET_FEATURED_MANGA = gql`
  query FeaturedAnime {
    featuredManga @client
  }
`;
