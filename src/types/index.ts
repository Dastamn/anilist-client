export type Sort = "SCORE_DESC" | "TRENDING_DESC" | "POPULARITY_DESC";

export interface IMedia {
  id: number;
  title: string;
  cover: string;
  type: string;
  format: string;
  score: number | null;
  genres: string[];
  header?: string;
}

export interface ICharacter {
  id: number;
  name: string;
  image: string;
  role: string;
}

// export interface Anime {
//   description: string;
//   averageScore: number;
//   trending: number
//   favourites
//   popularity
//   format
//   source
//   episodes
//   duration
//   hashtag
//   genres
//   bannerImage
//   status
//   startDate {
//     day
//     month
//     year
//   }
//   rankings {
//     rank
//     type
//     allTime
//     season
//     year
//   }
//   nextAiringEpisode {
//     airingAt
//     timeUntilAiring
//     episode
//   }
//   tags {
//     name
//     category
//     isMediaSpoiler
//     rank
//   }
//   trailer {
//     id
//     site
//     thumbnail
//   }
//   title {
//     english
//     romaji
//     native
//   }
//   coverImage {
//     large
//     extraLarge
//   }

//   studios(isMain: true) {
//     nodes {
//       id
//       name
//     }
//   }

//   relations {
//     edges {
//       relationType
//       node {
//         id
//         type
//         format
//         averageScore
//         genres
//         title {
//           romaji
//         }
//         coverImage {
//           extraLarge
//         }
//       }
//     }
//   }

//   characters(sort: ROLE, page: 1, perPage: 10) {
//     edges {
//       id
//       role
//       node {
//         name {
//           full
//         }
//         image {
//           large
//         }
//       }
//     }
//   }

//   recommendations(sort: RATING) {
//     nodes {
//       mediaRecommendation {
//         id
//         type
//         format
//         averageScore
//         genres
//         title {
//           romaji
//         }
//         coverImage {
//           extraLarge
//         }
//       }
//     }
//   }
// }
