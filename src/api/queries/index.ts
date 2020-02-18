import { gql, DocumentNode } from "apollo-boost";
import { MediaType, MediaSort, Season, MediaStatus } from "../../types";

export const getSortedMediaByStatus = (
  type: MediaType,
  sort: MediaSort,
  status?: MediaStatus,
  genres?: string[],
  tags?: string[]
): DocumentNode => gql`
query {
  Media(type: ${type}, sort: ${sort}${
  genres
    ? `, genre_in: [${genres.reduce(
        (acc, curr) => (acc ? acc + `", ${curr}"` : `"${curr}"`),
        ""
      )}]`
    : ""
}${
  tags
    ? `, tag_in: [${tags.reduce(
        (acc, curr) => (acc ? acc + `", ${curr}"` : `"${curr}"`),
        ""
      )}]`
    : ""
}
        ${status ? `, status_in: ${status}` : ""}) {
    id
    type
    format
    averageScore
    genres
    source
    bannerImage
    title {
      romaji
    }
    coverImage {
      medium
      large
      extraLarge
    }
  }
}
`;

export const getSortedMedia = (
  type: MediaType,
  sort: MediaSort,
  genres?: string[],
  tags?: string[],
  season?: Season,
  seasonYear?: number
) => gql`
query {
  Media(type: ${type}, sort: ${sort}${
  genres
    ? `, genre_in: [${genres.reduce(
        (acc, curr) => (acc ? acc + `", ${curr}"` : `"${curr}"`),
        ""
      )}]`
    : ""
}${
  tags
    ? `, tag_in: [${tags.reduce(
        (acc, curr) => (acc ? acc + `", ${curr}"` : `"${curr}"`),
        ""
      )}]`
    : ""
}
        ${season ? `, season: ${season}` : ""}
        ${seasonYear ? `, seasonYear: ${seasonYear}` : ""}) {
    id
    type
    format
    averageScore
    genres
    source
    bannerImage
    title {
      romaji
    }
    coverImage {
      medium
      large
      extraLarge
    }
  }
}
`;

export const getMediaById = (id: number, type: MediaType) => gql`
query {
  Media(id: ${id}, type: ${type}) {
    episodes
    duration
    nextAiringEpisode {
      airingAt
      timeUntilAiring
      episode
    }
    trailer {
      id
      site
      thumbnail
    }
    studios(isMain: true) {
      nodes {
        id
        name
      }
    }

    chapters
    volumes
    
    type
    description(asHtml: true)
    genres
    averageScore
    bannerImage
    status
    format
    source(version: 2)
    countryOfOrigin
    title {
        english
        romaji
        native
    }
      coverImage {
        medium
        large
        extraLarge
    }
    startDate {
        day
        month
        year
    }
    endDate {
        day
        month
        year
    }
    rankings {
        type
        rank
        allTime
        season
        year
    }
    relations {
      edges {
        relationType(version: 2)
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
            medium
            large
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
            medium
            large
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

export const getMediaList = (
  page: number,
  perPage: number,
  type: MediaType,
  sort?: MediaSort,
  season?: Season,
  seasonYear?: number
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

      media(sort: ${sort || "POPULARITY_DESC"}, type: ${type}${
  season ? `, season: ${season}` : ""
}${seasonYear ? `, seasonYear: ${seasonYear}` : ""}) {
        id
        type
        format
        averageScore
        genres
        source(version: 2)
        title {
          romaji
        }
        coverImage {
          medium
          large
          extraLarge
        }
      }
    }
  }
`;
