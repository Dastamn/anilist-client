import { gql } from "apollo-boost";
import { Sort } from "../../types";

export const getAnimeById = (id: number) => gql`
    query {
        
    }
`;

export const getSortedAnimes = (
  page: number,
  perPage: number,
  sort: Sort
) => gql`
  query {
    Page(page: ${page}, perPage: ${perPage}) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }

      media(sort: ${sort}, type: ANIME) {
        id
        type
        format
        averageScore
        genres
        title {
          romaji
        }
        coverImage {
          extraLarge
        }
      }
    }
  }
`;

export const getPopularAnime = (page: number, perPage: number) => gql`
  query {
    Page(page: ${page}, perPage: ${perPage}) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }

      media(sort: POPULARITY_DESC, type: ANIME) {
        id
        type
        format
        averageScore
        genres
        title {
          romaji
        }
        coverImage {
          extraLarge
        }
      }
    }
  }
`;

export const getSeasonalAnime = (
  page: number,
  perPage: number,
  season: string,
  year: number,
  sort?: Sort
) => gql`
  query {
    Page(page: ${page}, perPage: ${perPage}) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }

      media(season: ${season}, seasonYear: ${year}, sort: ${sort ||
  "POPULARITY_DESC"}, type: ANIME) {
        id
        type
        format
        averageScore
        genres
        title {
          romaji
        }
        coverImage {
          extraLarge
        }
      }
    }
  }
`;
