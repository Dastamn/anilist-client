import { gql } from "apollo-boost";
import { Sort } from "../../types";

export const getAnimeById = (id: number) => gql`
query {
  Media(id: ${id}) {
    description
    averageScore
    trending
    favourites
    popularity
    format
    source
    episodes
    duration
    hashtag
    genres
    bannerImage
    status
    startDate {
      day
      month
      year
    }
    rankings {
      rank
      type
      allTime
      season
      year
    }
    nextAiringEpisode {
      airingAt
      timeUntilAiring
      episode
    }
    tags {
      name
      category
      isMediaSpoiler
      rank
    }
    trailer {
      id
      site
      thumbnail
    }
    title {
      english
      romaji
      native
    }
    coverImage {
      large
      extraLarge
    }

    studios(isMain: true) {
      nodes {
        id
        name
      }
    }

    relations {
      edges {
        relationType
        node {
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

    characters(sort: ROLE, page: 1, perPage: 10) {
      edges {
        id
        role
        node {
          name {
            full
          }
          image {
            large
          }
        }
      }
    }

    stats {
      statusDistribution {
        status
        amount
      }
    }

    recommendations(sort: RATING_DESC) {
      nodes {
        mediaRecommendation {
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

    reviews(limit: 5, sort: RATING_DESC) {
      nodes {
        body
        summary
        score
        rating
      }
    }
  }
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
